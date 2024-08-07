package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
)

func (s *soundtrackService) AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error) {

	filter.UserID = s.extractCtxUserId(ctx)

	tracks, err := s.storage.AllSoundtracks(ctx, filter)
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	return &entity.SoundtrackList{
		Soundtracks: tracks,
	}, nil
}
