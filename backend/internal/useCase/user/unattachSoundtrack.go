package user

import (
	"context"
	"oasis/backend/internal/entity"
)

func (u *userUseCase) UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error) {

	affectedRows, err := u.storage.UnattachSoundtrack(ctx, input)

	if err != nil {
		return false, ErrTrackUnattachment
	}

	if affectedRows == 0 {
		return false, ErrUserOrTrackNotPresent
	}

	return true, nil
}
