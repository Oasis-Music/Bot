package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"oasis/backend/internal/adapters/graph/models"
)

// AddTrackToUser is the resolver for the addTrackToUser field.
func (r *mutationResolver) AddTrackToUser(ctx context.Context, input models.AddTrackToUserInput) (bool, error) {
	return r.UserService.AddTrack(ctx, input)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (models.UserResult, error) {
	return r.UserService.GetUser(ctx, id)
}

// UserTracks is the resolver for the userTracks field.
func (r *queryResolver) UserTracks(ctx context.Context, id string, filter models.UserTracksFilter) (models.UserTracksResult, error) {
	return r.UserService.GetUsersTraks(ctx, id, filter)
}
