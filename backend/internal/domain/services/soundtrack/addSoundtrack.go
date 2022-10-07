package soundtrack

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"

	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"
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

	fmt.Println("ffprobe open: ", tempFile.Name())

	// ffprobe -v quiet -print_format json -show_format -
	probe := exec.Command("ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", tempFile.Name())

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

	defer os.Remove(tempFile.Name())

	/*
		title: String!
		author: String!
		coverImage: Upload!
		file: Upload!

		-------------------

		Title       string +
		Author      string +
		Duration    int16
		CoverImage  sql.NullString
		FileURL     string
		IsValidated bool
		CreatorID   string
	*/

	var dbParams db.NewSoundtrackParams

	dbParams.Title = input.Title
	dbParams.Author = input.Author

	// TODO: fill

	dbParams.Duration = int16(100)
	dbParams.CoverImage = sql.NullString{}
	dbParams.FileURL = "uknown"
	dbParams.IsValidated = false
	dbParams.CreatorID = "sys"

	id, err := s.storage.AddSoundtrack(ctx, dbParams)
	if err != nil {
		return false, err
	}

	fmt.Println("Got ID:", id)

	return true, nil
}
