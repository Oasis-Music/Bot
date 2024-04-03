package user

import (
	"oasis/api/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserStorage struct {
	config   *config.Config
	database *pgxpool.Pool
}

func New(config *config.Config, db *pgxpool.Pool) *UserStorage {
	return &UserStorage{
		database: db,
		config:   config,
	}
}
