package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgx/v4"
)

func (s *soundtrackStorage) Soundtrack(ctx context.Context, trackID int32, userID int64) (*entity.Soundtrack, error) {

	coverURL := s.config.FileApi.CoverApiURL
	audioURL := s.config.FileApi.AudioApiURL

	data, err := s.sqlc.GetSoundtrack(ctx, sqlc.GetSoundtrackParams{
		ID:     trackID,
		UserID: userID,
	})

	if err == pgx.ErrNoRows {
		return nil, postgres.ErrNoData
	} else if err != nil {
		s.logger.Error("storage: soundtrack by id", "error", err)
		return nil, err
	}

	soundtrack := postgres.SoundtrackFromDTO(coverURL, audioURL, postgres.SoundtrackDTO(data))

	return &soundtrack, nil

}
