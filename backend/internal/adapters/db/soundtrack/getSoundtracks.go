package soundtrack

import (
	"context"
	"fmt"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"
)

const (
	ALL_SOUNDTRACKS_QUERY = `
	SELECT id,
		title,
		author,
		duration,
		cover_image,
		file_url,
		created_at
	FROM soundtrack
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *soundtrackStorage) GetSoundtracks(ctx context.Context, filter models.SoundtracksFilter) ([]db.SoundtrackDTO, error) {

	query, err := queryBuilder(ALL_SOUNDTRACKS_QUERY, filter)
	if err != nil {
		fmt.Println(err)
	}

	rows, err := s.database.Query(context.Background(), query)
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
			&i.FileURL,
			&i.CreatedAt,
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

func queryBuilder(query string, filter models.SoundtracksFilter) (string, error) {
	page := filter.Page - 1

	query += fmt.Sprintf(" ORDER BY id LIMIT %d OFFSET %d", ITEMS_PER_PAGE, page*ITEMS_PER_PAGE)

	return query, nil

}
