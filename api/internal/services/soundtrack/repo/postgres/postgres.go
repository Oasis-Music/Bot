package postgres

import (
	"log/slog"
	"oasis/api/internal/services/soundtrack/repo/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type storage struct {
	db     *pgxpool.Pool
	sqlc   *sqlc.Queries
	logger *slog.Logger
}

func New(logger *slog.Logger, db *pgxpool.Pool) *storage {

	sqlc := sqlc.New(db)

	return &storage{
		db:     db,
		sqlc:   sqlc,
		logger: logger,
	}
}
