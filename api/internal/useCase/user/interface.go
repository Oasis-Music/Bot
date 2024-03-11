package user

import (
	"context"
	"errors"
	"oasis/api/internal/auth"
	"oasis/api/internal/config"
	"oasis/api/internal/entity"
	"oasis/api/internal/useCase/adapters/storage"
	"strconv"
)

const (
	adminRole = "admin"
)

type UseCase interface {
	User(ctx context.Context, id int64) (*entity.User, error)
	Role(ctx context.Context, id int64) (string, error)
	Users(ctx context.Context, ids []int64) ([]entity.User, error)
	Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error)
	UserSoundtracks(ctx context.Context, id int64, options entity.UserTracksOptions) (*entity.UserTracks, error)
	AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error)
	UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error)
}

type userUseCase struct {
	config  *config.Config
	storage storage.User
	auth    auth.AuthService
}

func New(storage storage.User, config *config.Config, authService auth.AuthService) UseCase {
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
