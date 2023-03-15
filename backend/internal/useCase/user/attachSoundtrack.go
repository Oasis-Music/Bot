package user

import (
	"context"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"
)

func (u *userUseCase) AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error) {

	err := u.storage.AttachSoundtrack(ctx, input)

	if err != nil {
		switch err {
		case postgres.DuplicateKeyError:
			return false, ErrTrackAlreadyAttached
		case postgres.KeyIsNotPresentError:
			return false, ErrUserOrTrackNotPresent
		default:
			return false, ErrTrackAttachment
		}
	}

	return true, nil
}
