package soundtrack

import (
	"context"
	"errors"
	"fmt"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

func (s *soundtrackUseCase) Soundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	track, err := s.storage.Soundtrack(ctx, id, userID)
	if err != nil {
		if errors.Is(err, postgres.ErrSoundtrackNotFound) {
			return nil, ErrSoundtrackNotFound
		}

		fmt.Println(err)
		return nil, ErrFailedToFetchSoundtrack
	}

	return track, nil
}
