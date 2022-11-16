package user

import (
	"context"
	"oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/config"
)

type UserService interface {
	AuthorizeUser(ctx context.Context, initData string) (*models.AuthorizationResponse, error)
	GetUser(ctx context.Context, id string) (models.UserResult, error)
	GetUsersTraks(ctx context.Context, id string, filter models.UserTracksFilter) (models.UserTracksResult, error)
	AddTrack(ctx context.Context, input models.AddTrackToUserInput) (bool, error)
	DeleteTrack(ctx context.Context, input models.DeleteTrackFromUserInput) (bool, error)
}

type userService struct {
	config  *config.AppConfig
	storage user.UserStorage
}

func NewUserService(storage user.UserStorage, config *config.AppConfig) UserService {
	return &userService{
		storage: storage,
		config:  config,
	}
}
