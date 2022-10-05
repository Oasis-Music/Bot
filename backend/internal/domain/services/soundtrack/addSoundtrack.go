package soundtrack

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"

	ffmpeg "github.com/u2takey/ffmpeg-go"
)

func (s *soundtrackService) AddSoundtrack(ctx context.Context, input models.AddSoundtrackInput) (bool, error) {

	tempDirLoc := os.TempDir()

	// absPath, err := filepath.Abs("./temp")

	tempFile, err := os.CreateTemp(tempDirLoc, "audio-*.mp3")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()
	fileBytes, err := io.ReadAll(input.Audiofile.File)
	if err != nil {
		fmt.Println(err)
	}
	tempFile.Write(fileBytes)

	// defer os.Remove(tempFile.Name())

	fmt.Println("Open:", tempFile.Name())

	// ffmpeg -y -i FILE -map 0:a -c:a copy -map_metadata -1 FILE
	ffErr := ffmpeg.Input(tempFile.Name()).
		Output(tempDirLoc+"/result.mp3", ffmpeg.KwArgs{"map": "0:a", "c:a": "copy", "map_metadata": -1}).
		OverWriteOutput().ErrorToStdOut().WithOutput().Run()

	if ffErr != nil {
		fmt.Println(ffErr)
	}

	data, err := ffmpeg.Probe(tempDirLoc + "/result.mp3")
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
