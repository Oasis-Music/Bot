package auth

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authStorage struct {
	database *pgxpool.Pool
}

type AuthStorage interface {
	DeleteRefreshToken(ctx context.Context, id string) (int64, error)
	SaveRefreshToken(ctx context.Context, id string) error
}

func NewAuthStorage(db *pgxpool.Pool) AuthStorage {
	return &authStorage{
		database: db,
	}
}
