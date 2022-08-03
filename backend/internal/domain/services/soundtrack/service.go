package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"

	"github.com/jackc/pgx/v4"
)

type SoundtrackService interface {
	GetTrack(ctx context.Context, id string) (models.SoundtrackResult, error)
}

type soundtrackService struct {
	storage db.SoundtrackStorage
}

func NewSoundtrackService(storage db.SoundtrackStorage) SoundtrackService {
	return &soundtrackService{
		storage: storage,
	}
}

func (s *soundtrackService) GetTrack(ctx context.Context, id string) (models.SoundtrackResult, error) {

	soundtrack, err := s.storage.GetTrack(ctx, id)

	if err == pgx.ErrNoRows {
		return models.NotFound{
			Message: "not found",
		}, nil
	} else if err != nil {
		return nil, err
	}

	return &models.Soundtrack{
		ID:        strconv.Itoa(int(soundtrack.ID)),
		Title:     soundtrack.Title,
		CreatedAt: soundtrack.CreatedAt.UTC().String(),
	}, nil
}
