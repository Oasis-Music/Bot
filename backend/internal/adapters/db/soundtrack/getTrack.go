package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const GET_SOUNDTRACK_QUERY = `
SELECT id,
	title,
	author,
	duration,
	coverImage,
	fileURL,
	creator_id,
	created_at
FROM soundtracks
WHERE id = $1;
`

func (s *soundtrackStorage) GetTrack(ctx context.Context, id int32) (db.SoundtrackDTO, error) {

	row := s.database.QueryRow(context.Background(), GET_SOUNDTRACK_QUERY, id)

	var dto db.SoundtrackDTO
	err := row.Scan(
		&dto.ID,
		&dto.Title,
		&dto.Author,
		&dto.Duration,
		&dto.CoverImage,
		&dto.FileURL,
		&dto.CreatorID,
		&dto.CreatedAt,
	)

	return dto, err
}
