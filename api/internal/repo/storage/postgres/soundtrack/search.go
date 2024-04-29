package soundtrack

import (
	"context"
	"log"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *soundtrackStorage) Search(ctx context.Context, title string, userID int64) ([]entity.Soundtrack, error) {

	data, err := s.sqlc.GetSoundtrackByTitle(context.Background(), sqlc.GetSoundtrackByTitleParams{
		ToTsquery: title,
		UserID:    userID,
	})

	if err != nil {
		log.Println("storage/soundtrack(Search) -->", err)
		return nil, err
	}

	soundtracks := make([]entity.Soundtrack, 0, len(data))

	for _, track := range data {
		// info: track.CoverImage.Valid temp solution
		if track.CoverImage.Valid {
			track.CoverImage.String = s.config.FileApi.CoverApiURL + track.CoverImage.String
		}

		soundtracks = append(soundtracks, postgres.SoundtrackFromDTO(postgres.SoundtrackDTO(track)))
	}

	return soundtracks, nil

}
