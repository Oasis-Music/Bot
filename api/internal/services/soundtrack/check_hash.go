package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
)

func (s *soundtrackService) CheckHash(ctx context.Context, hash string) (*entity.Soundtrack, error) {

	userID, err := s.authService.ContextUserIdValue(ctx)
	if err != nil {
		return nil, err
	}

	soundtrack, err := s.storage.CheckHash(ctx, userID, hash)
	if errors.Is(err, ErrStorageNoData) {
		s.logger.WarnContext(ctx, "soundtrack hash not found", "hash", hash)
		return nil, ErrSoundtrackNotFound
	} else if err != nil {
		return nil, ErrFailedToFetchSoundtrack
	}

	s.logger.InfoContext(ctx, "soundtrack by hash", "id", soundtrack.ID)

	return soundtrack, nil
}
