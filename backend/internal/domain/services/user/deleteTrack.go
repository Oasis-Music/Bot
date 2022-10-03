package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"
)

func (u *userService) DeleteTrack(ctx context.Context, input models.DeleteTrackFromUserInput) (bool, error) {

	userId, err := strconv.Atoi(input.UserID)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := strconv.Atoi(input.TrackID)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	affectedRows, err := u.storage.DeleteTrack(ctx, db.DeleteTrackParams{
		UserId:  int32(userId),
		TrackId: int32(trackId),
	})

	if err != nil {
		return false, err
	}

	if affectedRows == 0 {
		return false, errors.New("track not found")
	}

	return true, nil
}
