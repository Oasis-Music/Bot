package user

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
)

func (u *userService) UserSoundtracks(ctx context.Context, userID int64, options entity.UserTracksOptions) (*entity.UserTracks, error) {

	if options.Page <= 0 {
		return nil, errors.New("page should be greater than 0")
	}

	if err := u.checkPermission(ctx, userID); err != nil {
		return nil, err
	}

	result, err := u.storage.UserSoundtracks(ctx, userID, options)
	if err != nil {
		return nil, ErrGetUserTracks
	}

	if len(result.Soundtracks) == 0 {
		return nil, ErrUserTracksNotFound
	}

	return result, nil
}
