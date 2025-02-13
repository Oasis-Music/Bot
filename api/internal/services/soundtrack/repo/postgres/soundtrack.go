package postgres

import (
	"context"
	"errors"
	"oasis/api/internal/services/soundtrack/entities"
	"oasis/api/internal/services/soundtrack/repo/postgres/sqlc"
	"oasis/api/pkg/postgres"

	"github.com/jackc/pgx/v4"
)

func (s *storage) Soundtrack(ctx context.Context, soundtrackID int64, userID int64) (*entities.Soundtrack, error) {

	data, err := s.sqlc.GetSoundtrack(ctx, sqlc.GetSoundtrackParams{
		ID:     soundtrackID,
		UserID: userID,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, postgres.ErrNoData
		}
		s.logger.Error("db get soundtrack", "soundtrack_id", soundtrackID, "error", err)
		return nil, err
	}

	soundtrack := buildSoundtrackEntity(SoundtrackDB(data))

	return &soundtrack, nil
}
