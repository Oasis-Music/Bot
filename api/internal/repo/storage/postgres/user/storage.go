package user

import (
	"log/slog"
	"oasis/api/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserStorage struct {
	config   *config.Config
	logger   *slog.Logger
	database *pgxpool.Pool
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool) *UserStorage {
	return &UserStorage{
		database: db,
		config:   config,
		logger:   logger,
	}
}
