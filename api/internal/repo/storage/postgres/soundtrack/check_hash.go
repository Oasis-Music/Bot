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

func (s *soundtrackStorage) CheckSoundtrackHash(ctx context.Context, userID int64, hash string) (*entity.Soundtrack, error) {

	coverURL := s.config.FileApi.CoverApiURL
	audioURL := s.config.FileApi.AudioApiURL

	data, err := s.sqlc.CheckSoundtrackHash(ctx, sqlc.CheckSoundtrackHashParams{
		UserID: userID,
		Hash:   hash,
	})

	if err == pgx.ErrNoRows {
		log.Println("storage/check soundtrack hash:", err)
		return nil, fmt.Errorf("storage: %w", postgres.ErrNoData)
	} else if err != nil {
		fmt.Println(err)
		return nil, err
	}

	soundtrack := postgres.SoundtrackFromDTO(coverURL, audioURL, postgres.SoundtrackDTO(data))

	return &soundtrack, nil

}
