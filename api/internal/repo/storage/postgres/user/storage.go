package user

import (
	"oasis/api/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserStorage struct {
	database *pgxpool.Pool
	config   *config.AppConfig
}

// return userStorage instead of interface
func NewUserStorage(db *pgxpool.Pool, config *config.AppConfig) *UserStorage {
	return &UserStorage{
		database: db,
		config:   config,
	}
}
