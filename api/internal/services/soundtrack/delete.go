package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/repo/storage/postgres"
)

func (s *soundtrackService) Delete(ctx context.Context, id int32) (bool, error) {

	// TODO: delete from S3 first

	success, err := s.storage.Delete(ctx, id)
	if err != nil {
		if errors.Is(err, postgres.ErrSoundtrackNotFound) {
			return false, ErrSoundtrackNotFound
		}

		return false, ErrInternalDeleteSoundtrack
	}

	if !success {
		return false, ErrSoundtrackNotFound
	}

	return success, nil
}
