package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
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

func (s *soundtrackStorage) Create(ctx context.Context, params entity.NewSoundtrack) (int32, error) {

	soundtrackCover := dbnull.NewNullString("", false)

	if params.CoverImage != nil {
		soundtrackCover = dbnull.NewNullString(*params.CoverImage, true)
	}

	row := s.database.QueryRow(context.Background(), ADD_NEW_SOUNDTRACK,
		params.Title,
		params.Author,
		params.Duration,
		soundtrackCover,
		params.AudioFile,
		params.IsValidated,
		params.CreatorID, // TODO: save valid user ID
	)
	var id int32
	err := row.Scan(&id)
	return id, err
}
