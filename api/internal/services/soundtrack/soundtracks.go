package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/services/soundtrack/entities"
)

func (s *soundtrackService) Soundtracks(ctx context.Context, limit int64, after int64, before int64, filter entities.SoundtrackFilter) (*entities.SoundtrackConnection, error) {

	if limit <= 0 {
		return nil, errors.New("limit must be non-negative and non-zero")
	}

	if after > 0 && before > 0 {
		return nil, errors.New("impossible to use forward and backward pagination simultaneously")
	}

	userID, err := s.authService.ContextUserIdValue(ctx)
	if err != nil {
		return nil, err
	}

	payload, err := s.storageV2.Soundtracks(ctx, limit, after, before, filter, userID)
	if err != nil {
		s.logger.Error("storage: soundtracks", "error", err)
		return nil, errors.New("failed to fetch soundtracks")
	}

	return payload, nil
}
