package user

import (
	"context"
	"log"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/entity"
)

func (u *userService) GetUsersTraks(ctx context.Context, userID int64, filter entity.UserTracksFilter) (*entity.UserTracks, error) {

	tracks, err := u.storage.GetUsersTraks(ctx, userID, db.UserTracksFilterParams{
		Page: filter.Page,
	})
	if err != nil {
		log.Println(err)
		return nil, ErrIternalUserTracksError
	}

	// INFO: without ErrNoRows -> https://github.com/jackc/pgx/issues/465
	if len(tracks) == 0 {
		return nil, ErrUserTracksNotFound
	}

	var soundtracks []entity.Soundtrack

	for _, track := range tracks {

		var coverImg *string

		if track.CoverImage.Valid {
			path := u.config.ExternalAPI.CoverImageBaseURL + track.CoverImage.String
			coverImg = &path
		}

		soundtracks = append(soundtracks, entity.Soundtrack{
			ID:         track.ID,
			Title:      track.Title,
			Author:     track.Author,
			Duration:   int(track.Duration),
			CoverImage: coverImg,
			Audio:      u.config.ExternalAPI.AudioBaseURL + track.AudioFile,
			CreatedAt:  track.CreatedAt,
		})
	}

	return &entity.UserTracks{
		Soundtracks: soundtracks,
	}, nil
}
