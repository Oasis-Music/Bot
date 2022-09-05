package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"oasis/backend/internal/adapters/graph/models"
)

// Soundtrack is the resolver for the soundtrack field.
func (r *queryResolver) Soundtrack(ctx context.Context, id string) (models.SoundtrackResult, error) {
	return r.SoundtrackService.GetTrack(ctx, id)
}

// Soundtracks is the resolver for the soundtracks field.
func (r *queryResolver) Soundtracks(ctx context.Context, filter models.SoundtracksFilter) (*models.SoundtracksResponse, error) {
	return r.SoundtrackService.GetSoundtracks(ctx, filter)
}
