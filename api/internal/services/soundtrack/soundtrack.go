package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
)

// Get soundtrack by ID
func (s *soundtrackService) Soundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	soundtrack, err := s.storage.Soundtrack(ctx, id, userID)
	if errors.Is(err, ErrStotageNoData) {
		s.logger.WarnContext(ctx, "soundtrack not found", "id", id)
		return nil, ErrSoundtrackNotFound
	} else if err != nil {
		return nil, ErrFailedToFetchSoundtrack
	}

	s.logger.InfoContext(ctx, "get soundtrack", "id", soundtrack.ID)

	return soundtrack, nil
}
