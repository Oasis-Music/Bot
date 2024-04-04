package soundtrack

import (
	"context"
	"log/slog"
	"oasis/api/internal/config"
	"oasis/api/internal/entity"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/user"

	"strconv"
)

type Service interface {
	Soundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error)
	AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error)
	Create(ctx context.Context, input entity.NewSoundtrackInput) (bool, error)
	Delete(ctx context.Context, id int32) (bool, error)
	Search(ctx context.Context, value string) ([]entity.Soundtrack, error)
}

type soundtrackService struct {
	config      *config.Config
	logger      *slog.Logger
	storage     SoundtrackStorage
	userService user.Service
}

func New(config *config.Config, logger *slog.Logger, storage SoundtrackStorage, userService user.Service) Service {
	return &soundtrackService{
		config:      config,
		logger:      logger,
		storage:     storage,
		userService: userService,
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
