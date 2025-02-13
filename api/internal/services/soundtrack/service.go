package soundtrack

import (
	"context"
	"errors"
	"log/slog"
	"math"
	"oasis/api/internal/config"
	"oasis/api/internal/entity"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/soundtrack/entities"
	"oasis/api/internal/services/soundtrack/repo/postgres"
	"oasis/api/internal/services/user"

	"github.com/go-playground/validator/v10"
	"github.com/jackc/pgx/v4/pgxpool"

	"strconv"
)

type Service interface {
	Soundtrack(ctx context.Context, id int64) (*entities.Soundtrack, error)
	AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error)
	Create(ctx context.Context, input entity.NewSoundtrackInput) (bool, error)
	Delete(ctx context.Context, id int32) (bool, error)
	Search(ctx context.Context, value string) ([]entity.Soundtrack, error)
	CheckHash(ctx context.Context, hash string) (*entity.Soundtrack, error)
}

type soundtrackService struct {
	config      *config.Config
	logger      *slog.Logger
	storage     SoundtrackStorage
	storageV2   SoundtrackModuleStorage
	s3store     S3store
	userService user.Service
	validate    *validator.Validate
}

func New(
	config *config.Config,
	logger *slog.Logger,
	storage SoundtrackStorage,
	s3store S3store,
	userService user.Service,
	db *pgxpool.Pool,
) Service {

	storageV2 := postgres.New(logger, db)

	return &soundtrackService{
		config:      config,
		logger:      logger,
		storage:     storage,
		storageV2:   storageV2,
		s3store:     s3store,
		userService: userService,
		validate:    validator.New(validator.WithRequiredStructEnabled()),
	}
}

func (s *soundtrackService) extractCtxUserId(ctx context.Context) int64 {

	var userID int64 = -1

	ctxUserId, ok := ctx.Value(auth.UserID).(string)
	if !ok {
		return -1
	}
	if ctxUserId == auth.UnknownUserID {
		return userID
	}

	val, err := strconv.ParseInt(ctxUserId, 10, 64)
	if err != nil {
		return userID
	}

	userID = val

	return userID
}

func trackDurationToInt16(d float64) (int16, error) {
	if d <= 0 {
		return 0, errors.New("track duration is 0")
	}
	return int16(math.Round(d)), nil
}
