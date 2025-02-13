package postgres

import (
	"context"
	"oasis/api/internal/services/auth/repo/postgres/sqlc"
	"time"

	"github.com/google/uuid"
)

func (a *authStorage) SaveRefreshToken(ctx context.Context, id uuid.UUID, expiresAt time.Time) error {

	return a.sqlc.SaveRefreshToken(ctx, sqlc.SaveRefreshTokenParams{
		ID:        id,
		ExpiresAt: expiresAt,
	})

}
