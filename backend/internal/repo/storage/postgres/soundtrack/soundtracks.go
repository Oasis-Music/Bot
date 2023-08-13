package soundtrack

import (
	"context"
	"errors"
	"fmt"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"
)

const (
	ALL_SOUNDTRACKS_QUERY = `
	SELECT id,
		title,
		author,
		duration,
		cover_image,
		audio_file,
		created_at,
		creator_id,
		EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $1) as attached
	FROM soundtrack
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *soundtrackStorage) AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) ([]entity.Soundtrack, error) {

	query, err := queryBuilder(ALL_SOUNDTRACKS_QUERY, filter)
	if err != nil {
		fmt.Println(err)
	}

	rows, err := s.database.Query(context.Background(), query, filter.UserID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dbSoundtracks := make([]postgres.SoundtrackDTO, 0, 15)
	for rows.Next() {
		var i postgres.SoundtrackDTO
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Author,
			&i.Duration,
			&i.CoverImage,
			&i.AudioFile,
			&i.CreatedAt,
			&i.CreatorID,
			&i.Attached,
		); err != nil {
			return nil, err
		}
		dbSoundtracks = append(dbSoundtracks, i)
	}
	// TODO: rows.Close() no value error ???
	// if err := rows.Close(); err != nil {
	// 	return nil, err
	// }
	if err := rows.Err(); err != nil {
		return nil, err
	}

	soundtracks := make([]entity.Soundtrack, 0, len(dbSoundtracks))

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
			CreatorID:  track.CreatorID,
		})
	}

	return soundtracks, nil
}

func queryBuilder(query string, filter entity.SoundtrackFilter) (string, error) {

	if filter.Page <= 0 {
		return "", errors.New("param 'page' must not be negative or zero")
	}

	page := filter.Page - 1

	query += fmt.Sprintf(" ORDER BY created_at DESC, id DESC LIMIT %d OFFSET %d", ITEMS_PER_PAGE, page*ITEMS_PER_PAGE)

	return query, nil
}
