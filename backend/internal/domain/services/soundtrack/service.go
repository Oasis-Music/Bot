package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db/soundtrack"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/config"
)

type SoundtrackService interface {
	GetTrack(ctx context.Context, id string) (models.SoundtrackResult, error)
	GetSoundtracks(ctx context.Context, filter models.SoundtracksFilter) (*models.SoundtracksResponse, error)
	AddSoundtrack(ctx context.Context, input models.AddSoundtrackInput) (bool, error)
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
