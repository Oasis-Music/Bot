package user

import (
	"context"
	"oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	"oasis/backend/internal/domain/entity"
)

type UserService interface {
	Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error)
	GetUser(ctx context.Context, id int64) (*entity.User, error)
	GetRole(ctx context.Context, id int64) (string, error)
	GetSoundtracks(ctx context.Context, id int64, filter entity.UserTracksFilter) (*entity.UserTracks, error)
	AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error)
	UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error)
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
