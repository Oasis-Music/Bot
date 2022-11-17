package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const ADD_NEW_SOUNDTRACK = `
	INSERT INTO soundtrack (
		title,
		author,
		duration,
		cover_image,
		audio_file,
		is_validated,
		creator_id
	) VALUES (
		$1, $2, $3, $4, $5, $6, $7
	)
	RETURNING id
`

func (s *soundtrackStorage) AddSoundtrack(ctx context.Context, params db.NewSoundtrackParams) (int32, error) {
	row := s.database.QueryRow(context.Background(), ADD_NEW_SOUNDTRACK,
		params.Title,
		params.Author,
		params.Duration,
		params.CoverImage,
		params.AudioFile,
		params.IsValidated,
		params.CreatorID,
	)
	var id int32
	err := row.Scan(&id)
	return id, err
}
