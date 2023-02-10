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
	cover_image,
	audio_file,
	creator_id,
	created_at,
	EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $2) as attached
FROM soundtrack
WHERE id = $1;
`

func (s *soundtrackStorage) GetSoundtrack(ctx context.Context, id int32, userID int64) (db.SoundtrackDTO, error) {

	row := s.database.QueryRow(context.Background(), GET_SOUNDTRACK_QUERY, id, userID)

	var dto db.SoundtrackDTO
	err := row.Scan(
		&dto.ID,
		&dto.Title,
		&dto.Author,
		&dto.Duration,
		&dto.CoverImage,
		&dto.AudioFile,
		&dto.CreatorID,
		&dto.CreatedAt,
		&dto.Attached,
	)

	return dto, err
}
