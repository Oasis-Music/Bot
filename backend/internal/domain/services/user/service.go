package user

import (
	"context"
	"oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	"oasis/backend/internal/domain/entity"
)

type UserService interface {
	GetRole(ctx context.Context, id int64) (string, error)
	AuthorizeUser(ctx context.Context, initData string) (*entity.UserAuthorization, error)
	GetUser(ctx context.Context, id int64) (*entity.User, error)
	GetUsersTraks(ctx context.Context, id int64, filter entity.UserTracksFilter) (*entity.UserTracks, error)
	AddTrack(ctx context.Context, input entity.AddTrackToUserParams) (bool, error)
	DeleteTrack(ctx context.Context, input entity.DeleteTrackFromUserParams) (bool, error)
}

type userService struct {
	config  *config.AppConfig
	storage user.UserStorage
	auth    auth.AuthService
}

func NewUserService(storage user.UserStorage, config *config.AppConfig, authService auth.AuthService) UserService {
	return &userService{
		storage: storage,
		config:  config,
		auth:    authService,
	}
}
