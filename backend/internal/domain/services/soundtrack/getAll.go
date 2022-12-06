package soundtrack

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/entity"
)

func (s *soundtrackService) GetAllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) (*entity.SoundtrackList, error) {

	tracks, err := s.storage.GetAllSoundtracks(ctx, db.SoundtrackFilterParams{
		Page: filter.Page,
	})
	if err != nil {
		return nil, ErrGetAllSoundtracks
	}

	var soundtracks []entity.Soundtrack

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
			CreatedAt:  track.CreatedAt,
		})
	}

	return &entity.SoundtrackList{
		Soundtracks: soundtracks,
	}, nil
}
