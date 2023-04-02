package soundtrack

import (
	"context"
	"oasis/backend/internal/entity"
)

func (s *soundtrackUseCase) GetByTitle(ctx context.Context, title string) ([]entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	soundtracks, err := s.storage.GetByTitle(ctx, title, userID)
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	return soundtracks, nil

}
