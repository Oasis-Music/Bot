package db

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

type soundtrackStorage struct {
	database *pgxpool.Pool
}

type SoundtrackStorage interface {
	GetTrack(ctx context.Context, id string) (SoundtrackDTO, error)
}

func NewSoundtrackStorage(db *pgxpool.Pool) SoundtrackStorage {
	return &soundtrackStorage{
		database: db,
	}
}

func (s *soundtrackStorage) GetTrack(ctx context.Context, id string) (SoundtrackDTO, error) {

	row := s.database.QueryRow(context.Background(), "SELECT id, title, created_at FROM soundtracks where id=$1", id)

	var dto SoundtrackDTO
	err := row.Scan(
		&dto.ID,
		&dto.Title,
		&dto.CreatedAt,
	)

	return dto, err
}
