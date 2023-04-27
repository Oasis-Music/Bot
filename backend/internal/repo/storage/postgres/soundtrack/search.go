package soundtrack

import (
	"context"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"
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

func (s *soundtrackStorage) Search(ctx context.Context, title string, userID int64) ([]entity.Soundtrack, error) {

	rows, err := s.database.Query(context.Background(), GET_SOUNDTRACK_BY_NAME_QUERY, title, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var dbSoundtracks []postgres.SoundtrackDTO

	for rows.Next() {
		var t postgres.SoundtrackDTO
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
		dbSoundtracks = append(dbSoundtracks, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	var soundtracks []entity.Soundtrack

	for _, track := range dbSoundtracks {

		var coverImg *string

		if track.CoverImage.Valid {
			path := s.config.ExternalAPI.CoverImageBaseURL + track.CoverImage.String
			coverImg = &path
		}

		soundtracks = append(soundtracks, entity.Soundtrack{
			ID:         track.ID,
			Title:      track.Title,
			Author:     track.Author,
			Duration:   int(track.Duration),
			CoverImage: coverImg,
			Audio:      s.config.ExternalAPI.AudioBaseURL + track.AudioFile,
			Attached:   track.Attached,
			CreatedAt:  track.CreatedAt,
		})
	}

	return soundtracks, nil

}
