package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

func (s *soundtrackStorage) GetTrack(ctx context.Context, id string) (db.SoundtrackDTO, error) {

	row := s.database.QueryRow(context.Background(), "SELECT id, title, created_at FROM soundtracks where id=$1", id)

	var dto db.SoundtrackDTO
	err := row.Scan(
		&dto.ID,
		&dto.Title,
		&dto.CreatedAt,
	)

	return dto, err
}
