package user

import (
	"context"
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/entity"
	"oasis/api/internal/services/auth"
)

type Service interface {
	User(ctx context.Context, id int64) (*entity.User, error)
	Role(ctx context.Context, id int64) (string, error)
	Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error)
	UserSoundtracks(ctx context.Context, id int64, options entity.UserTracksOptions) (*entity.UserTracks, error)
	AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error)
	UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error)
	// resolver specific
	UsersByID(ctx context.Context, ids []int64) ([]entity.User, error)
}

type userService struct {
	config      *config.Config
	storage     UserStorage
	authService auth.Service
	logger      *slog.Logger
}

func New(config *config.Config, logger *slog.Logger, storage UserStorage, authService auth.Service) Service {
	return &userService{
		storage:     storage,
		config:      config,
		authService: authService,
		logger:      logger,
	}
}
