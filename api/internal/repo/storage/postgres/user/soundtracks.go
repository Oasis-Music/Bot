package user

import (
	"context"
	"errors"
	"fmt"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

const (
	USER_SOUNDTRACKS_QUERY = `
	WITH s AS
		(SELECT *, count(s.id) over() AS total
	FROM soundtrack s WHERE EXISTS
	   	(SELECT
			FROM user_soundtrack us
			WHERE us.soundtrack_id = s.id
		AND us.user_id = $1) )
   	SELECT 
		s.id,
		s.title,
		s.author,
		s.duration,
		s.cover_image,
		s.audio_file,
		s.is_validated,
		s.created_at,
		s.creator_id,
		s.total
   	FROM s INNER JOIN user_soundtrack us ON us.soundtrack_id = s.id AND us.user_id = $1 ORDER BY us.created_at DESC
	`
	ITEMS_PER_PAGE     = 15
	PAGINATION_ERR_MSG = "invalid page"
)

func (s *UserStorage) UserSoundtracks(ctx context.Context, userID int64, options entity.UserTracksOptions) (*entity.UserTracks, error) {

	query, err := queryBuilder(USER_SOUNDTRACKS_QUERY, options)
	if err != nil {
		return nil, err
	}

	rows, err := s.database.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	dbTracks := make([]postgres.SoundtrackDTO, 0, ITEMS_PER_PAGE)

	var total int64

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
			&i.CreatedAt,
			&i.CreatorID,
			&total,
		); err != nil {
			return nil, err
		}
		dbTracks = append(dbTracks, i)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	soundtracks := make([]entity.Soundtrack, 0, len(dbTracks))

	for _, track := range dbTracks {

		var coverImg *string

		if track.CoverImage.Valid {
			path := s.config.FileApi.CoverApiURL + track.CoverImage.String
			coverImg = &path
		}

		soundtracks = append(soundtracks, entity.Soundtrack{
			ID:         track.ID,
			Title:      track.Title,
			Author:     track.Author,
			Duration:   int(track.Duration),
			CoverImage: coverImg,
			Audio:      s.config.FileApi.AudioApiURL + track.AudioFile,
			Validated:  track.IsValidated,
			CreatedAt:  track.CreatedAt,
			CreatorID:  track.CreatorID,
			Attached:   true, // soundtracks from user playlist attached by default
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
