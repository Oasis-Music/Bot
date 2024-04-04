package soundtrack

import (
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type soundtrackStorage struct {
	config   *config.Config
	logger   *slog.Logger
	database *pgxpool.Pool
	sqlc     *sqlc.Queries
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool, sqlc *sqlc.Queries) *soundtrackStorage {
	return &soundtrackStorage{
		config:   config,
		logger:   logger,
		database: db,
		sqlc:     sqlc,
	}
}
