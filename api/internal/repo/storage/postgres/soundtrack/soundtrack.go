package soundtrack

import (
	"context"
	"fmt"
	"log"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgx/v4"
)

func (s *soundtrackStorage) Soundtrack(ctx context.Context, trackID int32, userID int64) (*entity.Soundtrack, error) {

	data, err := s.sqlc.GetSoundtrack(context.Background(), sqlc.GetSoundtrackParams{
		ID:     trackID,
		UserID: userID,
	})

	if err == pgx.ErrNoRows {
		log.Println("storage/soundtrack(GetSoundtrack) -->", err)
		return nil, fmt.Errorf("storage: %w", postgres.ErrSoundtrackNotFound)
	} else if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var coverImg *string

	if data.CoverImage.Valid {
		path := s.config.ExternalAPI.CoverImageBaseURL + data.CoverImage.String
		coverImg = &path
	}

	return &entity.Soundtrack{
		ID:         data.ID,
		Title:      data.Title,
		Author:     data.Author,
		Duration:   int(data.Duration),
		CoverImage: coverImg,
		Audio:      s.config.ExternalAPI.AudioBaseURL + data.AudioFile,
		Attached:   data.Attached,
		CreatorID:  data.CreatorID,
		CreatedAt:  data.CreatedAt,
	}, nil

}
