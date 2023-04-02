package soundtrack

import (
	"context"
	"oasis/backend/internal/entity"
)

func (s *soundtrackUseCase) GetAllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error) {

	filter.UserID = s.extractCtxUserId(ctx)

	tracks, err := s.storage.GetAllSoundtracks(ctx, filter)
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	return &entity.SoundtrackList{
		Soundtracks: tracks,
	}, nil
}
