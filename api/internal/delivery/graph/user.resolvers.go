package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"
	"errors"
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/entity"
	UserService "oasis/api/internal/services/user"
	"oasis/api/internal/utils"
	"strconv"
)

// AttachSoundtrack is the resolver for the attachSoundtrack field.
func (r *mutationResolver) AttachSoundtrack(ctx context.Context, input models.AttachSoundtrackInput) (bool, error) {
	userId, err := strconv.ParseInt(input.UserID, 10, 64)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := strconv.ParseInt(input.TrackID, 10, 32)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	return r.UserService.AttachSoundtrack(ctx, entity.AttachSoundtrackToUserParams{
		UserID:       userId,
		SoundtrackID: int32(trackId),
	})
}

// UnattachSoundtrack is the resolver for the unattachSoundtrack field.
func (r *mutationResolver) UnattachSoundtrack(ctx context.Context, input models.UnattachSoundtrackInput) (bool, error) {
	userId, err := strconv.ParseInt(input.UserID, 10, 64)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := strconv.ParseInt(input.TrackID, 10, 32)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	return r.UserService.UnattachSoundtrack(ctx, entity.UnattachSoundtrackFromUserParams{
		UserID:       userId,
		SoundtrackID: int32(trackId),
	})
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (models.UserResult, error) {
	parsedId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, errors.New("invalid user id")
	}

	user, err := r.UserService.User(ctx, parsedId)
	if errors.Is(err, UserService.ErrUserNotFound) {
		return models.NotFound{
			Message: err.Error(),
		}, nil
	} else if err != nil {
		return nil, err
	}

	return models.User{
		ID:           utils.IntToString(user.ID),
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Username:     user.Username,
		LanguageCode: user.LanguageCode,
		Role:         user.Role,
		VisitedAt:    user.VisitedAt.UTC().String(),
		CreatedAt:    user.CreatedAt.UTC().String(),
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

// UserSoundtracks is the resolver for the userSoundtracks field.
func (r *queryResolver) UserSoundtracks(ctx context.Context, id string, filter models.UserSoundtracksFilter) (models.UserSoundtracksResult, error) {
	userId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, errors.New("invalid user id")
	}

	tracks, err := r.UserService.UserSoundtracks(ctx, userId, entity.UserTracksOptions{
		Page: filter.Page,
	})
	if errors.Is(err, UserService.ErrUserTracksNotFound) {
		return models.UserSoundtracksResponse{
			Total:       0,
			Soundtracks: nil,
		}, nil
	} else if err != nil {
		return models.NotFound{
			Message: err.Error(),
		}, nil
	}

	soundtracks := make([]models.Soundtrack, 0, len(tracks.Soundtracks))

	for _, track := range tracks.Soundtracks {

		soundtracks = append(soundtracks, models.Soundtrack{
			ID:        strconv.Itoa(int(track.ID)),
			Title:     track.Title,
			Author:    track.Author,
			Duration:  track.Duration,
			CoverURL:  utils.StringToNilPtr(track.CoverImage),
			AudioURL:  track.Audio,
			Attached:  track.Attached,
			CreatedAt: track.CreatedAt.UTC().String(),
			CreatorID: utils.IntToString(track.CreatorID),
		})
	}

	return models.UserSoundtracksResponse{
		Total:       int(tracks.Total),
		Soundtracks: soundtracks,
	}, nil
}
