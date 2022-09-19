package user

import (
	"context"
	"errors"
	"log"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/utils"
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

	return &models.UserTracksResponse{
		Soundtracks: soundtracks,
	}, nil
}
