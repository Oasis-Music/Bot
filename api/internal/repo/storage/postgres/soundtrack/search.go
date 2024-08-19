package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *soundtrackStorage) Search(ctx context.Context, title string, userID int64) ([]entity.Soundtrack, error) {

	coverURL := s.config.FileApi.CoverApiURL
	audioURL := s.config.FileApi.AudioApiURL

	data, err := s.sqlc.GetSoundtrackByTitle(context.Background(), sqlc.GetSoundtrackByTitleParams{
		ToTsquery: title,
		UserID:    userID,
	})

	if err != nil {
		s.logger.Error("storage: search soundtrack", "error", err)
		return nil, err
	}

	soundtracks := make([]entity.Soundtrack, 0, len(data))

	for _, track := range data {
		soundtracks = append(soundtracks, postgres.SoundtrackFromDTO(coverURL, audioURL, postgres.SoundtrackDTO(track)))
	}

	return soundtracks, nil

}
