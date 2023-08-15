package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
)

func (s *soundtrackUseCase) Search(ctx context.Context, value string) ([]entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	soundtracks, err := s.storage.Search(ctx, value, userID)
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	return soundtracks, nil

}
