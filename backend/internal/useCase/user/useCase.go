package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	"oasis/backend/internal/entity"
	"strconv"
)

const (
	adminRole = "admin"
)

type UseCase interface {
	Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error)
	GetUser(ctx context.Context, id int64) (*entity.User, error)
	GetRole(ctx context.Context, id int64) (string, error)
	GetSoundtracks(ctx context.Context, id int64, filter entity.UserTracksFilter) (*entity.UserTracks, error)
	AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error)
	UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error)
}

type userUseCase struct {
	config  *config.AppConfig
	storage user.UserStorage
	auth    auth.AuthService
}

func New(storage user.UserStorage, config *config.AppConfig, authService auth.AuthService) UseCase {
	return &userUseCase{
		storage: storage,
		config:  config,
		auth:    authService,
	}
}

func (u *userUseCase) checkPermission(ctx context.Context, userID int64) error {

	var noAccessErr = errors.New("you have no access")

	requestingUserRole, ok := ctx.Value(auth.UserRole).(string)
	if !ok {
		return errors.New("permission check failed")
	}

	if requestingUserRole == adminRole {
		return nil
	}

	requestingUser, ok := ctx.Value(auth.UserID).(string)
	if !ok {
		return errors.New("invalid user id")
	}

	tokenUserId, err := strconv.ParseInt(requestingUser, 10, 64) // INFO: 0 int64 is not real user ID
	if err != nil {
		return noAccessErr
	}
	if tokenUserId != userID {
		return noAccessErr
	}

	return nil
}
