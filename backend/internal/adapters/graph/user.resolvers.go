package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/graph/models"
	entityDomain "oasis/backend/internal/domain/entity"
	userUc "oasis/backend/internal/domain/services/user"
	"strconv"
)

// AddTrackToUser is the resolver for the addTrackToUser field.
func (r *mutationResolver) AddTrackToUser(ctx context.Context, input models.AddTrackToUserInput) (bool, error) {
	userId, err := strconv.ParseInt(input.UserID, 10, 64)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := strconv.ParseInt(input.TrackID, 10, 32)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	return r.UserService.AttachSoundtrack(ctx, entityDomain.AttachSoundtrackToUserParams{
		UserID:  userId,
		TrackID: int32(trackId),
	})
}

// DeleteTrackFromUser is the resolver for the deleteTrackFromUser field.
func (r *mutationResolver) DeleteTrackFromUser(ctx context.Context, input models.DeleteTrackFromUserInput) (bool, error) {
	userId, err := strconv.ParseInt(input.UserID, 10, 64)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := strconv.ParseInt(input.TrackID, 10, 32)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	return r.UserService.UnattachSoundtrack(ctx, entityDomain.UnattachSoundtrackFromUserParams{
		UserID:  userId,
		TrackID: int32(trackId),
	})
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (models.UserResult, error) {
	parsedId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, errors.New("invalid user id")
	}

	user, err := r.UserService.GetUser(ctx, parsedId)
	if errors.Is(err, userUc.ErrUserNotFound) {
		return models.NotFound{
			Message: err.Error(),
		}, nil
	} else if err != nil {
		return nil, err
	}

	return models.User{
		ID:           strconv.FormatInt(user.ID, 10),
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Username:     user.Username,
		LanguageCode: user.LanguageCode,
		Role:         user.Role,
		VisitedAt:    user.VisitedAt.UTC().String(),
		CreatedAt:    user.CreatedAt.UTC().String(),
	}, nil
}

// UserTracks is the resolver for the userTracks field.
func (r *queryResolver) UserTracks(ctx context.Context, id string, filter models.UserTracksFilter) (models.UserTracksResult, error) {
	userId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, errors.New("invalid user id")
	}

	tracks, err := r.UserService.GetSoundtracks(ctx, userId, entityDomain.UserTracksFilter{
		Page: filter.Page,
	})
	if errors.Is(err, userUc.ErrUserTracksNotFound) {
		return models.UserTracksResponse{
			Total:       0,
			Soundtracks: nil,
		}, nil
	} else if err != nil {
		return models.NotFound{
			Message: err.Error(),
		}, nil
	}

	var soundtracks []models.Soundtrack

	for _, track := range tracks.Soundtracks {

		soundtracks = append(soundtracks, models.Soundtrack{
			ID:        strconv.Itoa(int(track.ID)),
			Title:     track.Title,
			Author:    track.Author,
			Duration:  track.Duration,
			CoverURL:  track.CoverImage,
			AudioURL:  track.Audio,
			CreatedAt: track.CreatedAt.UTC().String(),
		})
	}

	return models.UserTracksResponse{
		Total:       int(tracks.Total),
		Soundtracks: soundtracks,
	}, nil
}

// AuthorizeUser is the resolver for the authorizeUser field.
func (r *queryResolver) AuthorizeUser(ctx context.Context, initData string) (*models.AuthorizationResponse, error) {
	authResp, err := r.UserService.Authorize(ctx, initData)
	if err != nil {
		return nil, err
	}

	return &models.AuthorizationResponse{
		Token:        authResp.AccessToken,
		RefreshToken: authResp.RefreshToken,
	}, nil
}
