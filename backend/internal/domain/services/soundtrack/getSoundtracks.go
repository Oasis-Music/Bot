package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"
)

func (s *soundtrackService) GetSoundtracks(ctx context.Context, filter models.SoundtracksFilter) (*models.SoundtracksResponse, error) {

	items, err := s.storage.GetSoundtracks(ctx, filter)
	if err != nil {
		return nil, err
	}

	var soundtracks []models.Soundtrack

	for _, item := range items {

		var coverImg string

		if item.CoverImage.Valid {
			coverImg = s.config.ExternalAPI.CoverImageBaseURL + item.CoverImage.String
		}

		soundtracks = append(soundtracks, models.Soundtrack{
			ID:         strconv.Itoa(int(item.ID)),
			Title:      item.Title,
			Author:     item.Author,
			Duration:   int(item.Duration),
			CoverImage: coverImg,
			FileURL:    s.config.ExternalAPI.AudioBaseURL + item.FileURL,
			CreatedAt:  item.CreatedAt.UTC().String(),
		})
	}

	return &models.SoundtracksResponse{
		Soundtracks: soundtracks,
	}, nil
}
