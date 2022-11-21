package auth

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authStorage struct {
	database *pgxpool.Pool
}

type AuthStorage interface {
	SaveRefreshToken(ctx context.Context, tokenID string) error
}

func NewAuthStorage(db *pgxpool.Pool) AuthStorage {
	return &authStorage{
		database: db,
	}
}
