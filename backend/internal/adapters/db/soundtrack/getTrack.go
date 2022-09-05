package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const getTrackQuery = `
SELECT id,
	title,
	author,
	duration,
	coverImage,
	fileURL,
	created_at
FROM soundtracks
WHERE id = $1;
`

func (s *soundtrackStorage) GetTrack(ctx context.Context, id int32) (db.SoundtrackDTO, error) {

	row := s.database.QueryRow(context.Background(), getTrackQuery, id)

	var dto db.SoundtrackDTO
	err := row.Scan(
		&dto.ID,
		&dto.Title,
		&dto.Author,
		&dto.Duration,
		&dto.CoverImage,
		&dto.FileURL,
		&dto.CreatedAt,
	)

	return dto, err
}
