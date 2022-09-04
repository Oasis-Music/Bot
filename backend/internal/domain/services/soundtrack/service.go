package soundtrack

import (
	"context"
	"log"
	"oasis/backend/internal/adapters/db/soundtrack"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/utils"
	"strconv"

	"github.com/jackc/pgx/v4"
)

type SoundtrackService interface {
	GetTrack(ctx context.Context, id string) (models.SoundtrackResult, error)
}

type soundtrackService struct {
	storage soundtrack.SoundtrackStorage
}

func NewSoundtrackService(storage soundtrack.SoundtrackStorage) SoundtrackService {
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

	coverPath := utils.GetEnv("COVER_PATH")
	if coverPath == "" {
		log.Fatal("COVER_PATH is not specified")
	}

	audioPath := utils.GetEnv("AUDIO_PATH")
	if coverPath == "" {
		log.Fatal("AUDIO_PATH is not specified")
	}

	return &models.Soundtrack{
		ID:         strconv.Itoa(int(soundtrack.ID)),
		Title:      soundtrack.Title,
		Author:     soundtrack.Author,
		Duration:   soundtrack.Duration,
		CoverImage: coverPath + soundtrack.CoverImage,
		FileURL:    audioPath + soundtrack.FileURL,
		CreatedAt:  soundtrack.CreatedAt.UTC().String(),
	}, nil
}
