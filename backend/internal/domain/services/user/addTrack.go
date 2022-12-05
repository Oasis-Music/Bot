package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/entity"
)

func (u *userService) AddTrack(ctx context.Context, input entity.AddTrackToUserParams) (bool, error) {

	err := u.storage.AddTrack(ctx, db.AddTrackParams{
		UserId:  input.UserID,
		TrackId: input.TrackID,
	})

	if err != nil {
		switch err {
		case db.DuplicateKeyError:
			return false, ErrTrackAlreadyAttached
		case db.KeyIsNotPresentError:
			return false, ErrUserOrTrackNotPresent
		default:
			return false, ErrTrackAttachment
		}
	}

	return true, nil
}
