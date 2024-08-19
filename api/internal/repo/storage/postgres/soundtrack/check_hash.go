package soundtrack

import (
	"context"
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
		return nil, postgres.ErrNoData
	} else if err != nil {
		s.logger.Error("storage: check audio hash", "error", err)
		return nil, err
	}

	soundtrack := postgres.SoundtrackFromDTO(coverURL, audioURL, postgres.SoundtrackDTO(data))

	return &soundtrack, nil
}
