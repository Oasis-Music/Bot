package soundtrack

import (
	"context"
	"oasis/backend/internal/domain/entity"
)

func (s *soundtrackService) GetByTitle(ctx context.Context, title string) ([]entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	tracks, err := s.storage.GetByTitle(ctx, title, userID)
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
			Attached:   track.Attached,
			CreatedAt:  track.CreatedAt,
		})
	}

	return soundtracks, nil

}
