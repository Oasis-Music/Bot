package postgres

import (
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/services/soundtrack/repo/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type storage struct {
	config *config.Config
	db     *pgxpool.Pool
	sqlc   *sqlc.Queries
	logger *slog.Logger
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool) *storage {

	sqlc := sqlc.New(db)

	return &storage{
		config: config,
		db:     db,
		sqlc:   sqlc,
		logger: logger,
	}
}
