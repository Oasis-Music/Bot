package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

func (u *userService) AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error) {

	err := u.storage.AttachSoundtrack(ctx, input)

	if err != nil {
		switch err {
		case postgres.ErrDuplicateKey:
			return false, ErrTrackAlreadyAttached
		case postgres.ErrKeyIsNotPresent:
			return false, ErrUserOrTrackNotPresent
		default:
			return false, ErrTrackAttachment
		}
	}

	return true, nil
}
