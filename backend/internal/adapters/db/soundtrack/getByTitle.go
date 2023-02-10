package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const GET_SOUNDTRACK_BY_NAME_QUERY = `
SELECT id,
	title,
	author,
	duration,
	cover_image,
	audio_file,
	creator_id,
	created_at,
	EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $2) as attached
FROM soundtrack
WHERE to_tsvector(title) @@ to_tsquery($1) LIMIT 7;
`

func (s *soundtrackStorage) GetByTitle(ctx context.Context, title string, userID int64) ([]db.SoundtrackDTO, error) {

	rows, err := s.database.Query(context.Background(), GET_SOUNDTRACK_BY_NAME_QUERY, title, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var soundtracks []db.SoundtrackDTO

	for rows.Next() {
		var t db.SoundtrackDTO
		if err := rows.Scan(
			&t.ID,
			&t.Title,
			&t.Author,
			&t.Duration,
			&t.CoverImage,
			&t.AudioFile,
			&t.CreatorID,
			&t.CreatedAt,
			&t.Attached,
		); err != nil {
			return nil, err
		}
		soundtracks = append(soundtracks, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return soundtracks, nil
}
