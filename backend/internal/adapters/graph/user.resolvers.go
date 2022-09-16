package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"oasis/backend/internal/adapters/graph/models"
)

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (models.UserResult, error) {
	return r.UserService.GetUser(ctx, id)
}
