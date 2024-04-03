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

func New(config *config.Config, db *pgxpool.Pool, sqlc *sqlc.Queries) *soundtrackStorage {
	return &soundtrackStorage{
		config:   config,
		database: db,
		sqlc:     sqlc,
	}
}
