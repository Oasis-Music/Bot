package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/domain/entity"
	soundtrackUc "oasis/backend/internal/domain/services/soundtrack"
	"oasis/backend/internal/utils"
	"strconv"
)

// AddSoundtrack is the resolver for the addSoundtrack field.
func (r *mutationResolver) AddSoundtrack(ctx context.Context, input models.AddSoundtrackInput) (bool, error) {

	return r.SoundtrackService.CreateSoundtrack(ctx, entity.NewSoundtrack{
		Title:      input.Title,
		Author:     input.Author,
		CoverImage: (*entity.Upload)(input.CoverImage),
		Audiofile:  entity.Upload(input.Audiofile),
	})

}

// Soundtrack is the resolver for the soundtrack field.
func (r *queryResolver) Soundtrack(ctx context.Context, id string) (models.SoundtrackResult, error) {

	trackId, err := strconv.ParseInt(id, 10, 32)
	if err != nil {
		return nil, errors.New("invalid track id")
	}

	track, err := r.SoundtrackService.GetSoundtrack(ctx, int32(trackId))
	if errors.Is(err, soundtrackUc.ErrSoundtrackNotFound) {
		return models.NotFound{
			Message: err.Error(),
		}, nil
	} else if err != nil {
		return nil, err
	}

	return models.Soundtrack{
		ID:        utils.FormatInt32(track.ID),
		Title:     track.Title,
		Author:    track.Author,
		Duration:  track.Duration,
		CoverURL:  track.CoverImage,
		AudioURL:  track.Audio,
		CreatorID: strconv.FormatInt(track.CreatorID, 10),
		CreatedAt: track.CreatedAt.UTC().String(),
	}, nil

}

// Soundtracks is the resolver for the soundtracks field.
func (r *queryResolver) Soundtracks(ctx context.Context, filter models.SoundtracksFilter) (*models.SoundtracksResponse, error) {
	tracks, err := r.SoundtrackService.GetAllSoundtracks(ctx, entity.SoundtrackFilter{
		Page: filter.Page,
	})

	if err != nil {
		return nil, err
	}

	var soundtracks []models.Soundtrack

	for _, track := range tracks.Soundtracks {

		soundtracks = append(soundtracks, models.Soundtrack{
			ID:        utils.FormatInt32(track.ID),
			Title:     track.Title,
			Author:    track.Author,
			Duration:  track.Duration,
			CoverURL:  track.CoverImage,
			AudioURL:  track.Audio,
			CreatedAt: track.CreatedAt.UTC().String(),
		})
	}

	return &models.SoundtracksResponse{
		Soundtracks: soundtracks,
	}, nil
}
