package soundtrack

import (
	"context"
	"log"
	"oasis/api/internal/entity"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *soundtrackStorage) Create(ctx context.Context, params entity.NewSoundtrack) (int32, error) {

	soundtrackCover := dbnull.NewNullString("", false)

	if params.CoverImage != nil {
		soundtrackCover = dbnull.NewNullString(*params.CoverImage, true)
	}

	trackID, err := s.sqlc.CreateSoundtrack(context.Background(), sqlc.CreateSoundtrackParams{
		Title:       params.Title,
		Author:      params.Author,
		Duration:    params.Duration,
		CoverImage:  soundtrackCover.NullString,
		AudioFile:   params.AudioFile,
		IsValidated: params.IsValidated,
		CreatorID:   params.CreatorID,
	})

	if err != nil {
		log.Println("storage/soundtrack(Create) -->", err)
		return -1, err
	}

	return trackID, nil
}
