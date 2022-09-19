package user

import (
	"context"
	"oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/adapters/graph/models"
)

type UserService interface {
	GetUser(ctx context.Context, id string) (models.UserResult, error)
	GetUsersTraks(ctx context.Context, id string, filter models.UserTracksFilter) (models.UserTracksResult, error)
	AddTrack(ctx context.Context, input models.AddTrackToUserInput) (bool, error)
}

type userService struct {
	storage user.UserStorage
}

func NewUserService(storage user.UserStorage) UserService {
	return &userService{
		storage: storage,
	}
}
