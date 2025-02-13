package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.54

import (
	"context"
	"errors"
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/entity"
	UserService "oasis/api/internal/services/user"
	"oasis/api/internal/utils"
)

// AttachSoundtrack is the resolver for the attachSoundtrack field.
func (r *mutationResolver) AttachSoundtrack(ctx context.Context, input models.AttachSoundtrackInput) (bool, error) {
	userId, err := utils.StrToInt64(input.UserID)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := utils.StrToInt32(input.TrackID)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	return r.UserService.AttachSoundtrack(ctx, entity.AttachSoundtrackToUserParams{
		UserID:       userId,
		SoundtrackID: trackId,
	})
}

// UnattachSoundtrack is the resolver for the unattachSoundtrack field.
func (r *mutationResolver) UnattachSoundtrack(ctx context.Context, input models.UnattachSoundtrackInput) (bool, error) {
	userId, err := utils.StrToInt64(input.UserID)
	if err != nil {
		return false, errors.New("invalid user ID")
	}

	trackId, err := utils.StrToInt32(input.TrackID)
	if err != nil {
		return false, errors.New("invalid track ID")
	}

	return r.UserService.UnattachSoundtrack(ctx, entity.UnattachSoundtrackFromUserParams{
		UserID:       userId,
		SoundtrackID: trackId,
	})
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (models.UserResult, error) {
	userId, err := utils.StrToInt64(id)
	if err != nil {
		return nil, errors.New("invalid user id")
	}

	user, err := r.UserService.User(ctx, userId)
	if errors.Is(err, UserService.ErrUserNotFound) {
		return models.NotFound{
			Message: err.Error(),
		}, nil
	} else if err != nil {
		return nil, err
	}

	return buildUserModel(user), nil
}

// AuthorizeUser is the resolver for the authorizeUser field.
func (r *queryResolver) AuthorizeUser(ctx context.Context, initData string) (*models.AuthorizationResponse, error) {
	authResp, err := r.UserService.WebAppAuth(ctx, initData)
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
	userId, err := utils.StrToInt64(id)
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
		soundtracks = append(soundtracks, buildSoundtrackModel(track))
	}

	return models.UserSoundtracksResponse{
		Total:       int(tracks.Total),
		Soundtracks: soundtracks,
	}, nil
}
