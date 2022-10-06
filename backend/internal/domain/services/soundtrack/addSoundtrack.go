package soundtrack

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"

	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"

	ffmpeg "github.com/u2takey/ffmpeg-go"
)

func (s *soundtrackService) AddSoundtrackX(ctx context.Context, input models.AddSoundtrackInput) (bool, error) {

	tempDirLoc := os.TempDir()

	// absPath, err := filepath.Abs("./temp")

	tempFile, err := os.CreateTemp(tempDirLoc, "audio-*.mp3")
	if err != nil {
		fmt.Println(err)
	}

	defer tempFile.Close()

	buf, err := io.ReadAll(input.Audiofile.File)
	if err != nil {
		fmt.Println(err)
	}
	tempFile.Write(buf)

	// defer os.Remove(tempFile.Name())

	fmt.Println("Open:", tempFile.Name())

	pr1, pw1 := io.Pipe()
	pr2, pw2 := io.Pipe()

	_, err = pw2.Write(buf)
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	pw2.Close()

	// ffmpeg -y -i FILE -map 0:a -c:a copy -map_metadata -1 FILE
	ffErr := ffmpeg.Input("pipe:").
		Output("pipe:", ffmpeg.KwArgs{"map": "0:a", "c:a": "copy", "map_metadata": -1}).WithInput(pr2).
		OverWriteOutput().ErrorToStdOut().WithOutput(pw1).Run()

	pr1.Close()

	if ffErr != nil {
		fmt.Println(ffErr)
	}

	var resultBuffer = bytes.NewBuffer(make([]byte, 5<<20))

	resultBuffer.ReadFrom(pr1)

	finalTempFile, err := os.CreateTemp(tempDirLoc, "pipe-audio-*.mp3")
	if err != nil {
		fmt.Println(err)
	}

	defer tempFile.Close()

	data, err := ffmpeg.Probe(tempDirLoc + "/" + finalTempFile.Name())
	// data, err := ffmpeg.Probe(tempFile.Name())

	if err != nil {
		panic(err)
	}

	log.Println("got audio info", data)

	type AudioInfo struct {
		Streams []struct {
			CodecType string `json:"codec_type"`
			CodecName string `json:"codec_name"`
		} `json:"streams"`
		Format struct {
			Duration string `json:"duration"`
		} `json:"format"`
	}
	ai := &AudioInfo{}
	err = json.Unmarshal([]byte(data), ai)
	if err != nil {
		panic(err)
	}

	duration := ai.Format.Duration
	codecType := ai.Streams[0].CodecType
	codecName := ai.Streams[0].CodecName

	fmt.Printf("Final info --> CodecType: %s, CodecName: %s, duration: %s\n", codecType, codecName, duration)

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

func (s *soundtrackService) AddSoundtrack(ctx context.Context, input models.AddSoundtrackInput) (bool, error) {

	// buf, err := io.ReadAll(input.Audiofile.File)
	// if err != nil {
	// 	fmt.Println("0:", err)
	// 	fmt.Println(err)
	// }

	buf := bytes.NewBuffer(make([]byte, 5<<20))

	if _, err := io.Copy(buf, input.Audiofile.File); err != nil {
		fmt.Println("io.copy:", err)
		return false, err
	}

	// ffmpeg -y -i FILE -map 0:a -c:a copy -map_metadata -1 FILE
	// cat test.mp3 | ffmpeg -y -hide_banner  -i pipe:0 -f mp3 -map 0:a -c:a copy -map_metadata -1 pipe:1 | cat > out.mp3

	cmd := exec.Command("ffmpeg", "-y", "-hide_banner", "-i", "pipe:0", "-f", "mp3", "-map", "0:a", "-c:a", "copy", "-map_metadata", "-1", "pipe:1")

	var resultBuffer = bytes.NewBuffer(make([]byte, 5<<20))

	cmd.Stderr = os.Stderr
	cmd.Stdout = resultBuffer

	stdin, err := cmd.StdinPipe()
	if err != nil {
		fmt.Println("1:", err)
		return false, err
	}

	err = cmd.Start()
	if err != nil {
		fmt.Println("2:", err)
		return false, err
	}

	_, err = stdin.Write(buf)
	if err != nil {
		fmt.Println("3:", err)
		return false, err
	}

	err = stdin.Close()
	if err != nil {
		fmt.Println("4:", err)
		return false, err
	}

	err = cmd.Wait()
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	tempDirLoc := os.TempDir()

	// absPath, err := filepath.Abs("./temp")

	tempFile, err := os.CreateTemp(tempDirLoc, "pipe_audio-*.mp3")
	if err != nil {
		fmt.Println(err)
	}

	defer tempFile.Close()

	tempFile.Write(resultBuffer.Bytes())

	data, err := ffmpeg.Probe(tempFile.Name())
	// data, err := ffmpeg.Probe(tempFile.Name())

	if err != nil {
		panic(err)
	}

	log.Println("got audio info", data)

	type AudioInfo struct {
		Streams []struct {
			CodecType string `json:"codec_type"`
			CodecName string `json:"codec_name"`
		} `json:"streams"`
		Format struct {
			Duration string `json:"duration"`
		} `json:"format"`
	}
	ai := &AudioInfo{}
	err = json.Unmarshal([]byte(data), ai)
	if err != nil {
		panic(err)
	}

	duration := ai.Format.Duration
	codecType := ai.Streams[0].CodecType
	codecName := ai.Streams[0].CodecName

	fmt.Printf("Final info --> CodecType: %s, CodecName: %s, duration: %s\n", codecType, codecName, duration)

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
