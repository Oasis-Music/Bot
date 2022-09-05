package soundtrack

import (
	"context"
	"log"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/utils"
	"strconv"
)

func (s *soundtrackService) GetSoundtracks(ctx context.Context, filter models.SoundtracksFilter) (*models.SoundtracksResponse, error) {

	items, err := s.storage.GetSoundtracks(ctx, filter)
	if err != nil {
		return nil, err
	}

	coverPath := utils.GetEnv("COVER_PATH")
	if coverPath == "" {
		log.Fatal("COVER_PATH is not specified")
	}

	audioPath := utils.GetEnv("AUDIO_PATH")
	if audioPath == "" {
		log.Fatal("AUDIO_PATH is not specified")
	}

	var soundtracks []models.Soundtrack

	for _, item := range items {

		var coverImg string

		if item.CoverImage.Valid {
			coverImg = coverPath + item.CoverImage.String
		}

		soundtracks = append(soundtracks, models.Soundtrack{
			ID:         strconv.Itoa(int(item.ID)),
			Title:      item.Title,
			Author:     item.Author,
			Duration:   int(item.Duration),
			CoverImage: coverImg,
			FileURL:    audioPath + item.FileURL,
			CreatedAt:  item.CreatedAt.UTC().String(),
		})
	}

	return &models.SoundtracksResponse{
		Soundtracks: soundtracks,
	}, nil
}
