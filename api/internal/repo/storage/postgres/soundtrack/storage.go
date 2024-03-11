package soundtrack

import (
	"oasis/api/internal/config"
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgx/v4/pgxpool"
)

type soundtrackStorage struct {
	database *pgxpool.Pool
	config   *config.Config
	sqlc     *sqlc.Queries
}

func NewSoundtrackStorage(db *pgxpool.Pool, config *config.Config, sqlc *sqlc.Queries) *soundtrackStorage {
	return &soundtrackStorage{
		database: db,
		config:   config,
		sqlc:     sqlc,
	}
}
