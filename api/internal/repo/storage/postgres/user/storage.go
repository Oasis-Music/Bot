package user

import (
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserStorage struct {
	config   *config.Config
	logger   *slog.Logger
	database *pgxpool.Pool
	sqlc     *sqlc.Queries
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool, sqlc *sqlc.Queries) *UserStorage {
	return &UserStorage{
		database: db,
		config:   config,
		logger:   logger,
		sqlc:     sqlc,
	}
}
