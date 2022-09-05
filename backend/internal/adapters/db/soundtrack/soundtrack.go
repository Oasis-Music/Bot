package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"

	"github.com/jackc/pgx/v4/pgxpool"
)

type soundtrackStorage struct {
	database *pgxpool.Pool
}

type SoundtrackStorage interface {
	GetTrack(ctx context.Context, id int32) (db.SoundtrackDTO, error)
}

func NewSoundtrackStorage(db *pgxpool.Pool) SoundtrackStorage {
	return &soundtrackStorage{
		database: db,
	}
}
