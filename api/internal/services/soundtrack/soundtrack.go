package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/services/soundtrack/entities"
)

func (s *soundtrackService) Soundtrack(ctx context.Context, soundtrackID int64) (*entities.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx) // todo: from auth

	soundtrack, err := s.storageV2.Soundtrack(ctx, soundtrackID, userID)
	if err != nil {
		if errors.Is(err, ErrStorageNoData) {
			s.logger.Warn("storage: soundtrack not found", "soundtrack_id", soundtrackID, "user_id", userID)
			return nil, ErrSoundtrackNotFound
		}

		s.logger.Error("storage: get soundtrack", "soundtrack_id", soundtrackID, "user_id", userID, "error", err)
		return nil, ErrFailedGetSoundtrack
	}

	s.logger.Info("get soundtrack", "soundtrack_id", soundtrackID, "user_id", userID)

	return soundtrack, nil
}
