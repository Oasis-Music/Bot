package user

import (
	"context"
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/entity"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/user/entities"
	"oasis/api/internal/services/user/repo/postgres"

	"github.com/jackc/pgx/v4/pgxpool"
)

type Service interface {
	User(ctx context.Context, id int64) (*entities.User, error)
	WebAppAuth(ctx context.Context, initData string) (*entities.UserSuccessAuth, error)
	UserSoundtracks(ctx context.Context, id int64, options entity.UserTracksOptions) (*entity.UserTracks, error)
	AttachSoundtrack(ctx context.Context, input entity.AttachSoundtrackToUserParams) (bool, error)
	UnattachSoundtrack(ctx context.Context, input entity.UnattachSoundtrackFromUserParams) (bool, error)
	// resolver specific
	UsersByID(ctx context.Context, ids []int64) ([]entity.User, error)
}

type userService struct {
	config      *config.Config
	storage     UserStorage
	storageV2   UserModularStorage
	authService auth.Service
	logger      *slog.Logger
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool, storage UserStorage, authService auth.Service) Service {

	storageV2 := postgres.New(config, logger, db)

	return &userService{
		config:      config,
		logger:      logger,
		storage:     storage,
		storageV2:   storageV2,
		authService: authService,
	}
}
