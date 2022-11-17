package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"
)

func (u *userService) GetUsersTraks(ctx context.Context, userID string, filter models.UserTracksFilter) (models.UserTracksResult, error) {

	id, err := strconv.Atoi(userID)
	if err != nil {
		return nil, errors.New("invalid ID")
	}

	items, err := u.storage.GetUsersTraks(ctx, int32(id), filter)
	if err != nil {
		return nil, err
	}

	// INFO: without ErrNoRows -> https://github.com/jackc/pgx/issues/465
	if len(items) == 0 {
		return models.NotFound{
			Message: "tracks not found",
		}, nil
	}

	var soundtracks []models.Soundtrack

	for _, item := range items {

		var coverImg *string

		if item.CoverImage.Valid {
			path := u.config.ExternalAPI.CoverImageBaseURL + item.CoverImage.String
			coverImg = &path
		}

		soundtracks = append(soundtracks, models.Soundtrack{
			ID:        strconv.Itoa(int(item.ID)),
			Title:     item.Title,
			Author:    item.Author,
			Duration:  int(item.Duration),
			CoverURL:  coverImg,
			AudioURL:  u.config.ExternalAPI.AudioBaseURL + item.AudioFile,
			CreatedAt: item.CreatedAt.UTC().String(),
		})
	}

	return &models.UserTracksResponse{
		Soundtracks: soundtracks,
	}, nil
}
