package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db/soundtrack"
	"oasis/backend/internal/adapters/graph/models"
)

type SoundtrackService interface {
	GetTrack(ctx context.Context, id string) (models.SoundtrackResult, error)
	GetSoundtracks(ctx context.Context, filter models.SoundtracksFilter) (*models.SoundtracksResponse, error)
}

type soundtrackService struct {
	storage soundtrack.SoundtrackStorage
}

func NewSoundtrackService(storage soundtrack.SoundtrackStorage) SoundtrackService {
	return &soundtrackService{
		storage: storage,
	}
}
