package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"oasis/backend/internal/adapters/graph/models"
)

// AddTrackToUser is the resolver for the addTrackToUser field.
func (r *mutationResolver) AddTrackToUser(ctx context.Context, input models.AddTrackToUserInput) (bool, error) {
	return r.UserService.AddTrack(ctx, input)
}

// DeleteTrackFromUser is the resolver for the deleteTrackFromUser field.
func (r *mutationResolver) DeleteTrackFromUser(ctx context.Context, input models.DeleteTrackFromUserInput) (bool, error) {
	return r.UserService.DeleteTrack(ctx, input)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (models.UserResult, error) {
	return r.UserService.GetUser(ctx, id)
}

// UserTracks is the resolver for the userTracks field.
func (r *queryResolver) UserTracks(ctx context.Context, id string, filter models.UserTracksFilter) (models.UserTracksResult, error) {
	return r.UserService.GetUsersTraks(ctx, id, filter)
}

// AuthorizeUser is the resolver for the authorizeUser field.
func (r *queryResolver) AuthorizeUser(ctx context.Context, initData string) (*models.AuthorizationResponse, error) {
	return r.UserService.AuthorizeUser(ctx, initData)
}

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) DeleteTrack(ctx context.Context, userID string, trackID string) (bool, error) {
	panic(fmt.Errorf("not implemented"))
}
