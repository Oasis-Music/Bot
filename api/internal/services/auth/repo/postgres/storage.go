package postgres

import (
	"oasis/api/internal/services/auth/repo/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authStorage struct {
	database *pgxpool.Pool
	sqlc     *sqlc.Queries
}

func New(db *pgxpool.Pool) *authStorage {

	sqlc := sqlc.New(db)

	return &authStorage{
		database: db,
		sqlc:     sqlc,
	}
}
