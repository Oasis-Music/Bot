package soundtrack

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"

	"oasis/backend/internal/adapters/db"
	dbnull "oasis/backend/internal/adapters/db/db-null"
	"oasis/backend/internal/adapters/graph/models"

	"github.com/99designs/gqlgen/graphql"
)

type Tags map[string]interface{}

type ProbeData struct {
	Format *Format `json:"format"`
}

type Format struct {
	Filename         string  `json:"filename"`
	NBStreams        int     `json:"nb_streams"`
	NBPrograms       int     `json:"nb_programs"`
	FormatName       string  `json:"format_name"`
	FormatLongName   string  `json:"format_long_name"`
	StartTimeSeconds float64 `json:"start_time,string"`
	DurationSeconds  float64 `json:"duration,string"`
	Size             string  `json:"size"`
	BitRate          string  `json:"bit_rate"`
	ProbeScore       int     `json:"probe_score"`
	TagList          Tags    `json:"tags"`
}

func trackDurationToInt16(d float64) (int16, error) {
	if d <= 0 {
		return 0, errors.New("track duration is 0")
	}
	return int16(math.Round(d)), nil
}

func (s *soundtrackService) AddSoundtrack(ctx context.Context, input models.AddSoundtrackInput) (bool, error) {

	buf, err := io.ReadAll(input.Audiofile.File)
	if err != nil {
		fmt.Println("io.ReadAll:", err)
		return false, err
	}

	// cat test.mp3 | ffmpeg -y -hide_banner  -i pipe:0 -f mp3 -map 0:a -c:a copy -map_metadata -1 pipe:1 | cat > out.mp3
	cmd := exec.Command("ffmpeg", "-y", "-hide_banner", "-i", "pipe:0", "-f", "mp3", "-map", "0:a", "-c:a", "copy", "-map_metadata", "-1", "pipe:1")

	var resultBuffer = bytes.NewBuffer(make([]byte, 0))

	r, w := io.Pipe()

	cmd.Stderr = os.Stderr
	cmd.Stdin = r
	cmd.Stdout = resultBuffer

	err = cmd.Start()
	if err != nil {
		fmt.Println("2:", err)
		return false, err
	}

	_, err = w.Write(buf)
	if err != nil {
		fmt.Println("w.Write", err)
		return false, err
	}
	w.Close()

	err = cmd.Wait()
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	tempDirLoc := os.TempDir()
	tempFile, err := os.CreateTemp(tempDirLoc, "oasis_audio-*.mp3")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	tempFile.Write(resultBuffer.Bytes())

	fileName := tempFile.Name()

	// ffprobe -v quiet -print_format json -show_format -
	probe := exec.Command("ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", fileName)

	var ffprobeBuf bytes.Buffer

	probe.Stdout = &ffprobeBuf

	if err := probe.Start(); err != nil {
		fmt.Println(err)
		return false, err
	}

	if err := probe.Wait(); err != nil {
		fmt.Println(err)
		return false, err
	}

	var data ProbeData

	if err := json.Unmarshal(ffprobeBuf.Bytes(), &data); err != nil {
		fmt.Println(err)
		return false, err
	}

	fmt.Printf("Final info --> FormatName: %s, Duration: %v\n", data.Format.FormatName, data.Format.DurationSeconds)

	defer os.Remove(fileName)

	duration, err := trackDurationToInt16(data.Format.DurationSeconds)
	if err != nil {
		return false, err
	}

	soundtrackURL, coverImageURL, err := s.saveMediaOnLocalServer(resultBuffer, input.CoverImage)
	if err != nil {
		return false, err
	}

	var dbParams db.NewSoundtrackParams

	dbParams.Title = input.Title
	dbParams.Author = input.Author
	dbParams.Duration = duration

	dbParams.CoverImage = dbnull.NewNullString(coverImageURL, true)
	dbParams.AudioFile = soundtrackURL
	dbParams.IsValidated = false
	dbParams.CreatorID = "sys"

	id, err := s.storage.AddSoundtrack(ctx, dbParams)
	if err != nil {
		return false, err
	}

	fmt.Println("Got ID:", id)

	return true, nil
}

func (s *soundtrackService) saveMediaOnLocalServer(audio *bytes.Buffer, coverImage graphql.Upload) (string, string, error) {

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)

	audioField, err := writer.CreateFormFile("soundtrack", "new_track.mp3")
	if err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")

	}
	audioField.Write(audio.Bytes())

	coverImg, err := io.ReadAll(coverImage.File)
	if err != nil {
		fmt.Println("io.ReadAll cover:", err)
		return "", "", errors.New("failed to save media")
	}

	coverImageField, err := writer.CreateFormFile("cover", coverImage.Filename)
	if err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")

	}
	coverImageField.Write(coverImg)

	if err := writer.Close(); err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")
	}

	req, err := http.NewRequest(http.MethodPost, "http://localhost:5000/createTrack", &body)
	if err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")

	}

	req.Header.Add("Content-Type", writer.FormDataContentType())

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")

	}

	respBody, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")

	}

	defer res.Body.Close()

	type responseData struct {
		AudioPath      string `json:"audioPath"`
		CoverImagePath string `json:"coverPath"`
	}

	var data responseData

	if err := json.Unmarshal(respBody, &data); err != nil {
		fmt.Println(err)
		return "", "", errors.New("failed to save media")
	}

	return data.AudioPath, data.CoverImagePath, nil
}
