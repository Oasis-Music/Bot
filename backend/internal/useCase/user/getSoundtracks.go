package user

import (
	"context"
	"log"
	"oasis/backend/internal/entity"
)

func (u *userUseCase) GetSoundtracks(ctx context.Context, userID int64, options entity.UserTracksOptions) (*entity.UserTracks, error) {

	if err := u.checkPermission(ctx, userID); err != nil {
		return nil, err
	}

	result, err := u.storage.GetUserTracks(ctx, userID, options)
	if err != nil {
		log.Println(err)
		return nil, ErrIternalUserTracksError
	}

	// INFO: without ErrNoRows -> https://github.com/jackc/pgx/issues/465
	if len(result.Soundtracks) == 0 {
		return nil, ErrUserTracksNotFound
	}

	return result, nil
}
