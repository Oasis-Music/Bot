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
	GetSoundtrack(ctx context.Context, id int32) (db.SoundtrackDTO, error)
	GetAllSoundtracks(ctx context.Context, filter db.SoundtrackFilterParams) ([]db.SoundtrackDTO, error)
	CreateSoundtrack(ctx context.Context, params db.NewSoundtrackParams) (int32, error)
}

func NewSoundtrackStorage(db *pgxpool.Pool) SoundtrackStorage {
	return &soundtrackStorage{
		database: db,
	}
}
