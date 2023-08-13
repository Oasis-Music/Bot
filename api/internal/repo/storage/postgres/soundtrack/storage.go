package soundtrack

import (
	"oasis/api/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type soundtrackStorage struct {
	database *pgxpool.Pool
	config   *config.AppConfig
}

func NewSoundtrackStorage(db *pgxpool.Pool, config *config.AppConfig) *soundtrackStorage {
	return &soundtrackStorage{
		database: db,
		config:   config,
	}
}
