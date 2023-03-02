package user

import (
	"context"
	"log"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/entity"
)

func (u *userService) GetSoundtracks(ctx context.Context, userID int64, filter entity.UserTracksFilter) (*entity.UserTracks, error) {

	if err := u.checkPermission(ctx, userID); err != nil {
		return nil, err
	}

	result, err := u.storage.GetUserTracks(ctx, userID, db.UserTracksFilterParams{
		Page: filter.Page,
	})
	if err != nil {
		log.Println(err)
		return nil, ErrIternalUserTracksError
	}

	// INFO: without ErrNoRows -> https://github.com/jackc/pgx/issues/465
	if len(result.Soundtracks) == 0 {
		return nil, ErrUserTracksNotFound
	}

	soundtracks := make([]entity.Soundtrack, 0, len(result.Soundtracks))

	for _, track := range result.Soundtracks {

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
			Attached:   true, // soundtracks from user playlist attached by default
			CreatedAt:  track.CreatedAt,
		})
	}

	return &entity.UserTracks{
		Total:       result.Total,
		Soundtracks: soundtracks,
	}, nil
}
