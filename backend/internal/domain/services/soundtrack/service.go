package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db/soundtrack"
	"oasis/backend/internal/config"
	"oasis/backend/internal/domain/entity"
)

type SoundtrackService interface {
	CreateSoundtrack(ctx context.Context, input entity.NewSoundtrack) (bool, error)
	GetSoundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error)
	GetAllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error)
}

type soundtrackService struct {
	config  *config.AppConfig
	storage soundtrack.SoundtrackStorage
}

func NewSoundtrackService(storage soundtrack.SoundtrackStorage, config *config.AppConfig) SoundtrackService {
	return &soundtrackService{
		config:  config,
		storage: storage,
	}
}
