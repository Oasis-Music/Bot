package soundtrack

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"io"
	"os"
	"os/exec"
	"path/filepath"

	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/s3"
	"oasis/api/internal/utils"
)

const (
	MaxCoverSize = 512 * 1024       // 512 KB
	MaxAudioSize = 20 * 1024 * 1024 // 20  MB
)

type AudioMetaData struct {
	Format *Format `json:"format"`
}

// type Tags map[string]interface{}
type Format struct {
	FormatName      string  `json:"format_name"`
	DurationSeconds float64 `json:"duration,string"`
	// Full:
	// Filename         string  `json:"filename"`
	// NBStreams        int     `json:"nb_streams"`
	// NBPrograms       int     `json:"nb_programs"`
	// FormatLongName   string  `json:"format_long_name"`
	// StartTimeSeconds float64 `json:"start_time,string"`
	// Size             string  `json:"size"`
	// BitRate          string  `json:"bit_rate"`
	// ProbeScore       int     `json:"probe_score"`
	// TagList          Tags    `json:"tags"`
}

func (s *soundtrackService) Create(ctx context.Context, input entity.NewSoundtrackInput) (ok bool, err error) {

	var coverFileName, audioFileName string

	defer func() {
		if err != nil {
			var cover string
			if coverFileName != "" {
				cover = s3.CoverPrefix + coverFileName
			}
			s.CreateCleanUp(cover, s3.AudioPrefix+audioFileName)
		}
	}()

	err = s.validate.Struct(&input)
	if err != nil {
		return false, err
	}

	// validate audio
	if input.Audiofile.Size > MaxAudioSize {
		return false, errors.New("audio is larger than 20MB")
	}

	ext := filepath.Ext(input.Audiofile.Filename)
	if ext != ".mp3" {
		return false, errors.New("wrong audio format")
	}

	// validate cover
	if input.CoverImage != nil {

		if input.CoverImage.Size > MaxCoverSize {
			return false, errors.New("cover is larger than 512KB")
		}

		ext := filepath.Ext(input.CoverImage.Filename)
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			return false, errors.New("cover is not an image")
		}
	}

	if input.CoverImage != nil {

		coverFile, err := proccessCover(input.CoverImage)
		if err != nil {
			s.logger.ErrorContext(ctx, "proccess cover", "err", err)
			return false, errors.New("fail to proccess cover")
		}

		coverName, err := s.s3store.PutCover(ctx, coverFile)
		if err != nil {
			s.logger.ErrorContext(ctx, "save S3 cover", "err", err)
			return false, errors.New("fail to save cover")
		}

		coverFileName = coverName
	}

	audioData, err := io.ReadAll(input.Audiofile.File)
	if err != nil {
		s.logger.ErrorContext(ctx, "read audio file error", "err", err)
		return false, errors.New("fail to proccess audio")
	}

	// check for audio existence
	hash, err := utils.GetMD5Hash(bytes.NewReader(audioData))
	if err != nil {
		return false, errors.New("cannot generate audio hash")
	}

	s.logger.InfoContext(ctx, "got hash", "hash", hash)

	soundtrack, _ := s.CheckHash(ctx, hash)
	if soundtrack != nil {
		return false, ErrSoundtrackAlreadyExists
	}

	audioFile, audioMeta, err := s.proccessAudio(audioData)
	if err != nil {
		s.logger.ErrorContext(ctx, "proccess audio", "err", err)
		return false, errors.New("fail to proccess audio")
	}

	trackDuration, err := trackDurationToInt16(audioMeta.Format.DurationSeconds)
	if err != nil {
		return false, err
	}

	audioName, err := s.s3store.PutAudio(ctx, audioFile)
	if err != nil {
		s.logger.ErrorContext(ctx, "save S3 audio", "err", err)
		return false, errors.New("fail to save audio")
	}

	audioFileName = audioName

	/**
	 * Why not to upload it concurrently?
	 * https://aws.github.io/aws-sdk-go-v2/docs/making-requests/#concurrently-using-service-clients
	 *
	 * Because one of upload operations is optional and what about re-tries?
	 */

	// coverFileName := "plug.webp"
	// audioFileName := "plug.mp3"
	// var trackDuration int16 = 137

	userID := s.extractCtxUserId(ctx)

	newTrack := entity.NewSoundtrack{
		Title:       input.Title,
		Author:      input.Author,
		Duration:    trackDuration,
		AudioFile:   audioFileName,
		IsValidated: false,
		CreatorID:   userID,
	}

	if coverFileName != "" {
		newTrack.CoverImage = &coverFileName
	}

	newTrackId, err := s.storage.Create(ctx, newTrack, hash)
	if err != nil {
		return false, ErrSoundtrackCreate
	}

	if input.Attach {
		_, err := s.userService.AttachSoundtrack(ctx, entity.AttachSoundtrackToUserParams{
			UserID:       userID,
			SoundtrackID: newTrackId,
		})
		if err != nil {
			return false, err
		}

	}

	s.logger.InfoContext(ctx, "soundtrack: create", "id", newTrackId)

	return true, nil
}

func proccessCover(cover *entity.Upload) (*bytes.Buffer, error) {

	buf, err := io.ReadAll(cover.File)
	if err != nil {
		return nil, err
	}

	// cat src.jpeg | ffmpeg -y -i pipe:0 -c:v libwebp -quality 50 -f webp  pipe:1 > dst.webp
	cmd := exec.Command(
		"ffmpeg",
		"-i", "pipe:0",
		"-c:v", "libwebp",
		"-quality", "50",
		"-f", "webp",
		"pipe:1",
	)

	cmd.Stdin = bytes.NewReader(buf)

	var resultBuffer = bytes.NewBuffer(make([]byte, 0))

	cmd.Stdout = resultBuffer

	err = cmd.Run()
	if err != nil {
		// for invalid ext: exit status 234
		return nil, err
	}

	return resultBuffer, nil
}

func (s *soundtrackService) proccessAudio(track []byte) (*bytes.Buffer, *AudioMetaData, error) {

	// cat in.mp3 | ffmpeg -hide_banner  -i pipe:0 -f mp3 -map 0:a -c:a copy -map_metadata -1 pipe:1 > out.mp3
	cmd := exec.Command(
		"ffmpeg",
		"-loglevel", "panic",
		// "-y",
		"-hide_banner",
		"-i", "pipe:0",
		"-f", "mp3",
		"-map", "0:a", "-c:a", "copy",
		"-map_metadata", "-1",
		"pipe:1",
	)

	var resultBuffer = bytes.NewBuffer(make([]byte, 0, 2*1024*1024)) // 2 mb pre-allocation

	cmd.Stdin = bytes.NewReader(track)
	cmd.Stdout = resultBuffer

	err := cmd.Run()
	if err != nil {
		// for invalid ext: exit status 234
		return nil, nil, err
	}

	tempDirLoc := os.TempDir()
	tempFile, err := os.CreateTemp(tempDirLoc, "oasis_audio-*.mp3")
	if err != nil {
		return nil, nil, err
	}
	defer tempFile.Close()

	_, err = tempFile.Write(resultBuffer.Bytes())
	if err != nil {
		return nil, nil, err
	}

	fileName := tempFile.Name()

	/*
		Full JSON:
			ffprobe -v quiet -print_format json -show_format -i <file>.mp3
		Necessary:
			ffprobe -v quiet -print_format json -show_entries format=duration,format_name -i <file>.mp3

		There is no way to get track duration from pipe:0
		so we need a temporary file(https://trac.ffmpeg.org/ticket/4358)
		"The file length is obviously not known with a pipe"
	*/
	probe := exec.Command(
		"ffprobe",
		"-v",
		"quiet",
		"-print_format",
		"json",
		"-show_entries",
		"format=duration,format_name",
		"-i",
		fileName,
	)

	var ffprobeBuf bytes.Buffer

	probe.Stdout = &ffprobeBuf

	if err = probe.Start(); err != nil {
		return nil, nil, err
	}

	if err = probe.Wait(); err != nil {
		return nil, nil, err
	}

	var data AudioMetaData

	if err = json.Unmarshal(ffprobeBuf.Bytes(), &data); err != nil {
		return nil, nil, errors.New("faile to extract JSON audio metadata")
	}

	defer os.Remove(fileName)

	return resultBuffer, &data, nil
}

func (s *soundtrackService) CreateCleanUp(keys ...string) {
	for _, key := range keys {
		if key != "" {
			go func() {
				_, err := s.s3store.DeleteObject(context.Background(), key)
				if err != nil {
					s.logger.Error("create cleanup S3", "err", err)
				}
			}()
		}
	}
}
