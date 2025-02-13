package postgres

import (
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/services/user/repo/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type storage struct {
	config   *config.Config
	logger   *slog.Logger
	sqlc     *sqlc.Queries
	database *pgxpool.Pool
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool) *storage {

	sqlc := sqlc.New(db)

	return &storage{
		config:   config,
		logger:   logger,
		database: db,
		sqlc:     sqlc,
	}
}
