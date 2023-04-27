package soundtrack

import (
	"context"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/useCase/adapters/storage"
	"oasis/backend/internal/useCase/user"
	"strconv"
)

type UseCase interface {
	DeleteSoundtrack(ctx context.Context, id int32) (bool, error)
	CreateSoundtrack(ctx context.Context, input entity.NewSoundtrackInput) (bool, error)
	GetSoundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error)
	GetAllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error)
	GetByTitle(ctx context.Context, title string) ([]entity.Soundtrack, error)
}

type soundtrackUseCase struct {
	config      *config.AppConfig
	storage     storage.Soundtrack
	userUseCase user.UseCase
}

func New(storage storage.Soundtrack, config *config.AppConfig, userUC user.UseCase) UseCase {
	return &soundtrackUseCase{
		config:      config,
		storage:     storage,
		userUseCase: userUC,
	}
}

func (s *soundtrackUseCase) extractCtxUserId(ctx context.Context) int64 {

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
