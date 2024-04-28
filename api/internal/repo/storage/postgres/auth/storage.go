package auth

import (
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authStorage struct {
	database *pgxpool.Pool
	sqlc     *sqlc.Queries
}

func New(db *pgxpool.Pool, sqlc *sqlc.Queries) *authStorage {
	return &authStorage{
		database: db,
		sqlc:     sqlc,
	}
}
