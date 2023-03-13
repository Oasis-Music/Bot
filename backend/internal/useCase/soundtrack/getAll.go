package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/entity"
)

func (s *soundtrackUseCase) GetAllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error) {

	userID := s.extractCtxUserId(ctx)

	tracks, err := s.storage.GetAllSoundtracks(ctx, db.SoundtrackFilterParams{
		Page:   filter.Page,
		UserID: userID,
	})
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	soundtracks := make([]entity.Soundtrack, 0, len(tracks))

	for _, track := range tracks {

		var coverImg *string

		if track.CoverImage.Valid {
			path := s.config.ExternalAPI.CoverImageBaseURL + track.CoverImage.String
			coverImg = &path
		}

		soundtracks = append(soundtracks, entity.Soundtrack{
			ID:         track.ID,
			Title:      track.Title,
			Author:     track.Author,
			Duration:   int(track.Duration),
			CoverImage: coverImg,
			Audio:      s.config.ExternalAPI.AudioBaseURL + track.AudioFile,
			Attached:   track.Attached,
			CreatedAt:  track.CreatedAt,
		})
	}

	return &entity.SoundtrackList{
		Soundtracks: soundtracks,
	}, nil
}
