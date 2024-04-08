package soundtrack

import (
	"context"
	"log"
	"oasis/api/internal/entity"
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

		var coverImg *string

		if track.CoverImage.Valid {
			path := s.config.FileApi.CoverApiURL + track.CoverImage.String
			coverImg = &path
		}

		soundtracks = append(soundtracks, entity.Soundtrack{
			ID:         track.ID,
			Title:      track.Title,
			Author:     track.Author,
			Duration:   int(track.Duration),
			CoverImage: coverImg,
			Audio:      s.config.FileApi.AudioApiURL + track.AudioFile,
			Validated:  track.IsValidated,
			Attached:   track.Attached,
			CreatedAt:  track.CreatedAt,
			CreatorID:  track.CreatorID,
		})
	}

	return soundtracks, nil

}
