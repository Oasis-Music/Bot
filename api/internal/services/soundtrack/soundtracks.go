package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
)

func (s *soundtrackService) AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error) {

	userID, err := s.authService.ContextUserIdValue(ctx)
	if err != nil {
		return nil, err
	}

	filter.UserID = userID

	tracks, err := s.storage.AllSoundtracks(ctx, filter)
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	return &entity.SoundtrackList{
		Soundtracks: tracks,
	}, nil
}
