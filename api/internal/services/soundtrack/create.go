package soundtrack

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"

	"oasis/api/internal/entity"
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

	var coverObjectKey, audioObjectKey string

	defer func() {
		if err != nil {
			s.CreateCleanUp(coverObjectKey, audioObjectKey)
		}
	}()

	err = s.validate.Struct(&input)
	if err != nil {
		return false, err
	}

	// validate audio
	if input.Audiofile.Size > MaxAudioSize {
		return false, errors.New("audio file is too big")
	}

	ext := filepath.Ext(input.Audiofile.Filename)
	if ext != ".mp3" {
		return false, fmt.Errorf("wrong audio format")
	}

	// validate cover
	if input.CoverImage != nil {

		if input.CoverImage.Size > MaxCoverSize {
			return false, errors.New("cover image bigger than 512 KB")
		}

		ext := filepath.Ext(input.CoverImage.Filename)
		if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
			return false, fmt.Errorf("cover type is not an image")
		}
	}

	if input.CoverImage != nil {

		coverFile, err := proccessCover(input.CoverImage)
		if err != nil {
			return false, errors.New("fail to proccess cover")
		}

		coverName, err := s.s3store.PutCover(ctx, coverFile)
		if err != nil {
			return false, errors.New("audio s3 err")
		}

		// TODO
		// coverObjectKey = "cover/" + coverName
		coverObjectKey = "test/" + coverName

		fmt.Println("new cover on s3:", coverObjectKey)
	}

	audioFile, audioMeta, err := proccessAudio(input.Audiofile)
	if err != nil {
		return false, errors.New("fail to proccess audio")
	}

	duration, err := trackDurationToInt16(audioMeta.Format.DurationSeconds)
	if err != nil {
		return false, err
	}

	fmt.Printf("audio ext: %s, dur(sec): %v\n", audioMeta.Format.FormatName, audioMeta.Format.DurationSeconds)

	audioName, err := s.s3store.PutAudio(ctx, audioFile)
	if err != nil {
		return false, errors.New("audio s3 err")
	}
	// fmt.Println("new audio on s3:", "audio/"+audioName)

	// TODO
	audioObjectKey = "test/" + audioName

	/**
	 * Why not to upload it concurrently?
	 * https://aws.github.io/aws-sdk-go-v2/docs/making-requests/#concurrently-using-service-clients
	 *
	 * Because one of upload operations is optional and what about re-tries?
	 */

	return false, errors.New("for dev p error")

	soundtrackURL, coverImageURL, err := s.saveMediaOnLocalServer(audioFile, input.CoverImage)
	if err != nil {
		return false, err
	}

	userID := s.extractCtxUserId(ctx)

	var newTrack entity.NewSoundtrack

	newTrack.Title = input.Title
	newTrack.Author = input.Author
	newTrack.Duration = duration

	newTrack.CoverImage = coverImageURL
	newTrack.AudioFile = soundtrackURL
	newTrack.IsValidated = false
	newTrack.CreatorID = userID

	newTrackId, err := s.storage.Create(ctx, newTrack)
	if err != nil {
		log.Panicln("fail to create track", err)
		return false, err
	}

	if input.Attach {
		_, err := s.userService.AttachSoundtrack(ctx, entity.AttachSoundtrackToUserParams{
			UserID:       userID,
			SoundtrackID: newTrackId,
		})

		if err != nil {
			log.Panicln("fail to attach new track to user playlist", err)
			return false, err
		}

	}

	fmt.Println("Got ID:", newTrackId)

	return true, nil
}

func (s *soundtrackService) saveMediaOnLocalServer(audio *bytes.Buffer, coverImage *entity.Upload) (string, *string, error) {

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)

	audioField, err := writer.CreateFormFile("soundtrack", "new_track.mp3")
	if err != nil {
		fmt.Println(err)
		return "", nil, errors.New("failed to save media")

	}

	_, err = audioField.Write(audio.Bytes())
	if err != nil {
		fmt.Println(err)
		return "", nil, errors.New("failed to save media")
	}

	if coverImage != nil {
		coverImg, err := io.ReadAll(coverImage.File)
		if err != nil {
			fmt.Println("io.ReadAll cover:", err)
			return "", nil, errors.New("failed to save media")
		}

		coverImageField, err := writer.CreateFormFile("cover", coverImage.Filename)
		if err != nil {
			fmt.Println(err)
			return "", nil, errors.New("failed to save media")
		}

		_, err = coverImageField.Write(coverImg)
		if err != nil {
			fmt.Println(err)
			return "", nil, errors.New("failed to save media")
		}
	}

	if err := writer.Close(); err != nil {
		fmt.Println("writer.Close()", err)
		return "", nil, errors.New("failed to save media")
	}

	req, err := http.NewRequest(http.MethodPost, s.config.FileApiURL+"/createTrack", &body)
	if err != nil {
		fmt.Println("build /createTrack", err)
		return "", nil, errors.New("failed to save media")

	}

	req.Header.Add("Content-Type", writer.FormDataContentType())

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("make request", err)
		return "", nil, errors.New("failed to save media")

	}

	respBody, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println("read a r.Body", err)
		return "", nil, errors.New("failed to save media")
	}

	defer res.Body.Close()

	type responseData struct {
		AudioPath      string  `json:"audioPath"`
		CoverImagePath *string `json:"coverPath,omitempty"`
	}

	fmt.Println("block storage answer: ", string(respBody))

	var data responseData

	if err := json.Unmarshal(respBody, &data); err != nil {
		fmt.Println("json.Unmarshal", err)
		return "", nil, errors.New("failed to save media")
	}

	return data.AudioPath, data.CoverImagePath, nil
}

func proccessCover(cover *entity.Upload) (*bytes.Buffer, error) {

	buf, err := io.ReadAll(cover.File)
	if err != nil {
		fmt.Println("cover io.ReadAll:", err)
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
		fmt.Println("cover cmd.Run() err:", err)
		return nil, err
	}

	return resultBuffer, nil

}

func proccessAudio(track entity.Upload) (*bytes.Buffer, *AudioMetaData, error) {
	buf, err := io.ReadAll(track.File)
	if err != nil {
		fmt.Println("io.ReadAll:", err)
		return nil, nil, err
	}

	// cat test.mp3 | ffmpeg -hide_banner  -i pipe:0 -f mp3 -map 0:a -c:a copy -map_metadata -1 pipe:1 > out.mp3
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

	cmd.Stdin = bytes.NewReader(buf)
	cmd.Stdout = resultBuffer

	err = cmd.Run()
	if err != nil {
		// for invalid ext: exit status 234
		fmt.Println("audio cmd.Run() err:", err)
		return nil, nil, err
	}

	tempDirLoc := os.TempDir()
	tempFile, err := os.CreateTemp(tempDirLoc, "oasis_audio-*.mp3")
	if err != nil {
		fmt.Println(err)
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
		fmt.Println("cmd: ffprobe start err:", err)
		return nil, nil, err
	}

	if err = probe.Wait(); err != nil {
		fmt.Println(err)
		return nil, nil, err
	}

	var data AudioMetaData

	if err = json.Unmarshal(ffprobeBuf.Bytes(), &data); err != nil {
		fmt.Println("faile to extract audio metadata")
		return nil, nil, err
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
					log.Println(err)
				}
			}()
		}
	}
}
