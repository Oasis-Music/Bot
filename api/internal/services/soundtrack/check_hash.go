package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
)

func (s *soundtrackService) CheckSoundtrackHash(ctx context.Context, hash string) (*entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	soundtrack, err := s.storage.CheckSoundtrackHash(ctx, userID, hash)
	if errors.Is(err, ErrStotageNoData) {
		return nil, ErrSoundtrackNotFound
	} else if err != nil {
		return nil, ErrFailedToFetchSoundtrack
	}

	return soundtrack, nil

}
