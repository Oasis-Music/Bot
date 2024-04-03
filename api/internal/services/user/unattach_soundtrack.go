package user

import (
	"context"
	"oasis/api/internal/entity"
)

func (u *userService) UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error) {

	affectedRows, err := u.storage.UnattachSoundtrack(ctx, input)

	if err != nil {
		return false, ErrTrackUnattachment
	}

	if affectedRows == 0 {
		return false, ErrUserOrTrackNotPresent
	}

	return true, nil
}
