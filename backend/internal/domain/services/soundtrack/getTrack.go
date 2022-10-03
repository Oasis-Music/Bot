package soundtrack

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"

	"github.com/jackc/pgx/v4"
)

func (s *soundtrackService) GetTrack(ctx context.Context, id string) (models.SoundtrackResult, error) {

	i, err := strconv.Atoi(id)
	if err != nil {
		return nil, errors.New("invalid ID")
	}

	soundtrack, err := s.storage.GetTrack(ctx, int32(i))

	if err == pgx.ErrNoRows {
		return models.NotFound{
			Message: "soundtrack not found",
		}, nil
	} else if err != nil {
		return nil, err
	}

	var coverImg string

	if soundtrack.CoverImage.Valid {
		coverImg = s.config.ExternalAPI.CoverImageBaseURL + soundtrack.CoverImage.String
	}

	return &models.Soundtrack{
		ID:         strconv.Itoa(int(soundtrack.ID)),
		Title:      soundtrack.Title,
		Author:     soundtrack.Author,
		Duration:   int(soundtrack.Duration),
		CoverImage: coverImg,
		FileURL:    s.config.ExternalAPI.AudioBaseURL + soundtrack.FileURL,
		CreatorID:  soundtrack.CreatorID,
		CreatedAt:  soundtrack.CreatedAt.UTC().String(),
	}, nil
}
