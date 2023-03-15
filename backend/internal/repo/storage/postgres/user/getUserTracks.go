package user

import (
	"context"
	"errors"
	"fmt"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"
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

func (s *UserStorage) GetUserTracks(ctx context.Context, userID int64, options entity.UserTracksOptions) (*entity.UserTracks, error) {

	query, err := queryBuilder(USER_SOUNDTRACKS_QUERY, options)
	if err != nil {
		return nil, err
	}

	rows, err := s.database.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dbTracks := make([]postgres.SoundtrackDTO, 0, 15)

	var total int64

	for rows.Next() {
		var t postgres.SoundtrackDTO
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
		dbTracks = append(dbTracks, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	soundtracks := make([]entity.Soundtrack, 0, len(dbTracks))

	for _, track := range dbTracks {

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
			Attached:   true, // soundtracks from user playlist attached by default
			CreatedAt:  track.CreatedAt,
		})
	}

	return &entity.UserTracks{
		Total:       total,
		Soundtracks: soundtracks,
	}, nil

}

func queryBuilder(query string, options entity.UserTracksOptions) (string, error) {

	if options.Page <= 0 {
		return "", errors.New("param 'page' must not be negative or zero")
	}

	page := options.Page - 1

	query += fmt.Sprintf(",id LIMIT %d OFFSET %d", ITEMS_PER_PAGE, page*ITEMS_PER_PAGE)

	return query, nil
}
