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

	coverURL := s.config.FileApi.CoverApiURL
	audioURL := s.config.FileApi.AudioApiURL

	data, err := s.sqlc.GetSoundtrack(context.Background(), sqlc.GetSoundtrackParams{
		ID:     trackID,
		UserID: userID,
	})

	if err == pgx.ErrNoRows {
		log.Println("storage/GetSoundtrack -->", err)
		return nil, fmt.Errorf("storage: %w", postgres.ErrSoundtrackNotFound)
	} else if err != nil {
		fmt.Println(err)
		return nil, err
	}

	soundtrack := postgres.SoundtrackFromDTO(coverURL, audioURL, postgres.SoundtrackDTO(data))

	return &soundtrack, nil

}
