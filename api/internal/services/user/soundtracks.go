package user

import (
	"context"
	"oasis/api/internal/entity"
)

func (u *userService) UserSoundtracks(ctx context.Context, userID int64, options entity.UserTracksOptions) (*entity.UserTracks, error) {

	if err := u.checkPermission(ctx, userID); err != nil {
		return nil, err
	}

	result, err := u.storage.UserSoundtracks(ctx, userID, options)
	if err != nil {
		u.logger.ErrorContext(ctx, err)
		return nil, ErrIternalUserTracksError
	}

	// INFO: without ErrNoRows -> https://github.com/jackc/pgx/issues/465
	if len(result.Soundtracks) == 0 {
		return nil, ErrUserTracksNotFound
	}

	return result, nil
}
