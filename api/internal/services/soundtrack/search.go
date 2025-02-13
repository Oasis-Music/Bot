package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
)

func (s *soundtrackService) Search(ctx context.Context, value string) ([]entity.Soundtrack, error) {

	userID, err := s.authService.ContextUserIdValue(ctx)
	if err != nil {
		return nil, err
	}

	soundtracks, err := s.storage.Search(ctx, value, userID)
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	return soundtracks, nil

}
