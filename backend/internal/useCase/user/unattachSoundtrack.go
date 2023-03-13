package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/entity"
)

func (u *userUseCase) UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error) {

	affectedRows, err := u.storage.UnattachSoundtrack(ctx, db.UnattachSoundtrackParams{
		UserId:  input.UserID,
		TrackId: input.TrackID,
	})

	if err != nil {
		return false, ErrTrackUnattachment
	}

	if affectedRows == 0 {
		return false, ErrUserOrTrackNotPresent
	}

	return true, nil
}
