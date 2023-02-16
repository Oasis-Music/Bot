package user

import (
	"context"
	"errors"
	"fmt"
	"oasis/backend/internal/adapters/db"
)

const (
	USER_SOUNDTRACKS_QUERY = `
	WITH s AS
	(SELECT s.id,
		s.title,
		s.author,
		s.duration,
		s.cover_image,
		s.audio_file,
		s.created_at,
		count(s.id) over() AS total
	FROM soundtrack s
		WHERE EXISTS
	   	(SELECT
			FROM user_soundtrack us
			WHERE us.soundtrack_id = s.id
		AND us.user_id = $1) )
   	SELECT s.id,
		s.title,
		s.author,
		s.duration,
		s.cover_image,
		s.audio_file,
		s.created_at,
		s.total
   	FROM s INNER JOIN user_soundtrack us ON us.soundtrack_id = s.id AND us.user_id = $1 ORDER BY us.created_at DESC
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *userStorage) GetUserTracks(ctx context.Context, userID int64, filter db.UserTracksFilterParams) (*db.UserTracksResult, error) {

	query, err := queryBuilder(USER_SOUNDTRACKS_QUERY, filter)
	if err != nil {
		return nil, err
	}

	rows, err := s.database.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tracks []db.SoundtrackDTO

	var total int64

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
			&total,
		); err != nil {
			return nil, err
		}
		tracks = append(tracks, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &db.UserTracksResult{
		Total:       total,
		Soundtracks: tracks,
	}, nil
}

func queryBuilder(query string, filter db.UserTracksFilterParams) (string, error) {

	if filter.Page <= 0 {
		return "", errors.New("param 'page' must not be negative or zero")
	}

	page := filter.Page - 1

	query += fmt.Sprintf(",id LIMIT %d OFFSET %d", ITEMS_PER_PAGE, page*ITEMS_PER_PAGE)

	return query, nil
}
