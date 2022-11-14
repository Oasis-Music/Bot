package user

import (
	"context"
	"fmt"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"
)

const (
	USER_SOUNDTRACKS_QUERY = `
	SELECT soundtrack.id,
       soundtrack.title,
       soundtrack.author,
       soundtrack.duration,
       soundtrack.cover_image,
       soundtrack.audio_file,
       soundtrack.created_at
	FROM soundtrack
	JOIN user_soundtrack ON user_soundtrack.soundtrack_id = soundtrack.id
	JOIN users ON user_soundtrack.user_id = users.id
	WHERE user_soundtrack.user_id = $1
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *userStorage) GetUsersTraks(ctx context.Context, id int32, filter models.UserTracksFilter) ([]db.SoundtrackDTO, error) {

	query, err := queryBuilder(USER_SOUNDTRACKS_QUERY, filter)
	if err != nil {
		fmt.Println(err)
	}

	rows, err := s.database.Query(context.Background(), query, id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tracks []db.SoundtrackDTO
	for rows.Next() {
		var t db.SoundtrackDTO
		if err := rows.Scan(
			&t.ID,
			&t.Title,
			&t.Author,
			&t.Duration,
			&t.CoverImage,
			&t.AudioFile,
			&t.CreatedAt,
		); err != nil {
			return nil, err
		}
		tracks = append(tracks, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tracks, nil
}

func queryBuilder(query string, filter models.UserTracksFilter) (string, error) {
	page := filter.Page - 1

	query += fmt.Sprintf(" ORDER BY id LIMIT %d OFFSET %d", ITEMS_PER_PAGE, page*ITEMS_PER_PAGE)

	return query, nil
}
