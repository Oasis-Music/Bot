package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"

	"github.com/jackc/pgx/v4/pgxpool"
)

type soundtrackStorage struct {
	database *pgxpool.Pool
}

type SoundtrackStorage interface {
	GetTrack(ctx context.Context, id int32) (db.SoundtrackDTO, error)
	GetSoundtracks(ctx context.Context, filter models.SoundtracksFilter) ([]db.SoundtrackDTO, error)
	AddSoundtrack(ctx context.Context, params db.NewSoundtrackParams) (int32, error)
}

func NewSoundtrackStorage(db *pgxpool.Pool) SoundtrackStorage {
	return &soundtrackStorage{
		database: db,
	}
}
