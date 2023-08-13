package soundtrack

import (
	"context"
	"fmt"
	"oasis/api/internal/entity"

	"github.com/jackc/pgx/v4"
)

func (s *soundtrackUseCase) Soundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	track, err := s.storage.Soundtrack(ctx, id, userID)

	if err == pgx.ErrNoRows {
		return nil, ErrSoundtrackNotFound
	} else if err != nil {
		fmt.Println(err)
		return nil, ErrFailedToFetchSoundtrack
	}

	return track, nil
}
