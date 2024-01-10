package soundtrack

import (
	"context"
	"oasis/api/internal/repo/storage/postgres"
)

func (s *soundtrackStorage) Delete(ctx context.Context, id int32) (bool, error) {

	rowsAffected, err := s.sqlc.DeleteSoundtrack(context.Background(), id)
	if err != nil {
		return false, err
	}

	if rowsAffected == 0 {
		return false, postgres.ErrSoundtrackNotFound
	}

	return true, nil

}
