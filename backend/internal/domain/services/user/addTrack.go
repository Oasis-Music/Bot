package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"
)

func (u *userService) AddTrack(ctx context.Context, input models.AddTrackToUserInput) (bool, error) {

	userId, err := strconv.ParseInt(input.UserID, 10, 64)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := strconv.Atoi(input.TrackID)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	err = u.storage.AddTrack(ctx, db.AddTrackParams{
		UserId:  userId,
		TrackId: int32(trackId),
	})

	if err != nil {
		switch err {
		case db.DuplicateKeyError:
			return false, errors.New("track is already attached to user")
		case db.KeyIsNotPresentError:
			return false, errors.New("user or track is not present")
		default:
			return false, err
		}
	}

	return true, nil
}
