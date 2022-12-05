package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/entity"
)

func (u *userService) AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error) {

	err := u.storage.AttachSoundtrack(ctx, db.AttachSoundtrackParams{
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
