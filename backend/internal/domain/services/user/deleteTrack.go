package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/entity"
)

func (u *userService) DeleteTrack(ctx context.Context, input entity.DeleteTrackFromUserParams) (bool, error) {

	affectedRows, err := u.storage.DeleteTrack(ctx, db.DeleteTrackParams{
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
