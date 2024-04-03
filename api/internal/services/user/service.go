package user

import (
	"context"
	"errors"
	"oasis/api/internal/auth"
	"oasis/api/internal/config"
	"oasis/api/internal/entity"
	"strconv"
)

const (
	adminRole = "admin"
)

type Service interface {
	User(ctx context.Context, id int64) (*entity.User, error)
	Role(ctx context.Context, id int64) (string, error)
	Users(ctx context.Context, ids []int64) ([]entity.User, error)
	Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error)
	UserSoundtracks(ctx context.Context, id int64, options entity.UserTracksOptions) (*entity.UserTracks, error)
	AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error)
	UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error)
}

type userService struct {
	config  *config.Config
	storage UserStorage
	auth    auth.AuthService
}

func New(config *config.Config, storage UserStorage, authService auth.AuthService) Service {
	return &userService{
		storage: storage,
		config:  config,
		auth:    authService,
	}
}

func (u *userService) checkPermission(ctx context.Context, userID int64) error {

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
