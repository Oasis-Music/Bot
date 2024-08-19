package soundtrack

import (
	"context"
	"errors"
	"fmt"
	"log"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

const (
	ALL_SOUNDTRACKS_QUERY = `
	SELECT 
		id,
		title,
		author,
		duration,
		cover_image,
		audio_file,
		is_validated,
		creator_id,
		created_at,
		EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $1) as attached
	FROM soundtrack
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *soundtrackStorage) AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) ([]entity.Soundtrack, error) {

	coverURL := s.config.FileApi.CoverApiURL
	audioURL := s.config.FileApi.AudioApiURL

	query, err := queryBuilder(ALL_SOUNDTRACKS_QUERY, filter)
	if err != nil {
		return nil, err
	}

	rows, err := s.database.Query(context.Background(), query, filter.UserID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dbSoundtracks := make([]postgres.SoundtrackDTO, 0, ITEMS_PER_PAGE)
	for rows.Next() {
		var i postgres.SoundtrackDTO
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Author,
			&i.Duration,
			&i.CoverImage,
			&i.AudioFile,
			&i.IsValidated,
			&i.CreatorID,
			&i.CreatedAt,
			&i.Attached,
		); err != nil {
			return nil, err
		}
		dbSoundtracks = append(dbSoundtracks, i)
	}

	if err := rows.Err(); err != nil {
		log.Println("storage/(AllSoundtracks) -->", err)
		return nil, err
	}

	soundtracks := make([]entity.Soundtrack, 0, len(dbSoundtracks))

	for _, track := range dbSoundtracks {
		soundtracks = append(soundtracks, postgres.SoundtrackFromDTO(coverURL, audioURL, postgres.SoundtrackDTO(track)))
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
