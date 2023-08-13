package soundtrack

import (
	"context"
	"fmt"
)

func (s *soundtrackUseCase) Delete(ctx context.Context, id int32) (bool, error) {

	// TODO: delete from S3 first

	affectedRows, err := s.storage.Delete(ctx, id)
	if err != nil {
		fmt.Println(err)
		return false, ErrInternalDeleteSoundtrack
	}

	if affectedRows == 0 {
		return false, ErrSoundtrackNotFound
	}

	return true, nil
}
