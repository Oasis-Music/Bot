package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
)

func (s *soundtrackService) CheckHash(ctx context.Context, hash string) (*entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	soundtrack, err := s.storage.CheckHash(ctx, userID, hash)
	if errors.Is(err, ErrStotageNoData) {
		s.logger.Warn("soundtrack: check audio hash", "warn", "hash doesn't exist")
		return nil, ErrSoundtrackNotFound
	} else if err != nil {
		return nil, ErrFailedToFetchSoundtrack
	}

	s.logger.Info("soundtrack: by audio hash", "id", soundtrack.ID)

	return soundtrack, nil

}
