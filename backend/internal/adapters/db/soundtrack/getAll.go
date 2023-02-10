package soundtrack

import (
	"context"
	"errors"
	"fmt"
	"oasis/backend/internal/adapters/db"
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
		EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $1) as attached
	FROM soundtrack
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *soundtrackStorage) GetAllSoundtracks(ctx context.Context, filter db.SoundtrackFilterParams) ([]db.SoundtrackDTO, error) {

	query, err := queryBuilder(ALL_SOUNDTRACKS_QUERY, filter)
	if err != nil {
		fmt.Println(err)
	}

	rows, err := s.database.Query(context.Background(), query, filter.UserID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var items []db.SoundtrackDTO
	for rows.Next() {
		var i db.SoundtrackDTO
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Author,
			&i.Duration,
			&i.CoverImage,
			&i.AudioFile,
			&i.CreatedAt,
			&i.Attached,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	// TODO: rows.Close() no value error ???
	// if err := rows.Close(); err != nil {
	// 	return nil, err
	// }
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func queryBuilder(query string, filter db.SoundtrackFilterParams) (string, error) {

	if filter.Page <= 0 {
		return "", errors.New("param 'page' must not be negative or zero")
	}

	page := filter.Page - 1

	query += fmt.Sprintf(" ORDER BY id DESC LIMIT %d OFFSET %d", ITEMS_PER_PAGE, page*ITEMS_PER_PAGE)

	return query, nil
}
