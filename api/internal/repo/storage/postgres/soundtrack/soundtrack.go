package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

const GET_SOUNDTRACK_QUERY = `
SELECT id,
	title,
	author,
	duration,
	cover_image,
	audio_file,
	creator_id,
	created_at,
	EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $2) as attached
FROM soundtrack
WHERE id = $1;
`

func (s *soundtrackStorage) Soundtrack(ctx context.Context, id int32, userID int64) (*entity.Soundtrack, error) {

	row := s.database.QueryRow(context.Background(), GET_SOUNDTRACK_QUERY, id, userID)

	var dto postgres.SoundtrackDTO

	err := row.Scan(
		&dto.ID,
		&dto.Title,
		&dto.Author,
		&dto.Duration,
		&dto.CoverImage,
		&dto.AudioFile,
		&dto.CreatorID,
		&dto.CreatedAt,
		&dto.Attached,
	)

	if err != nil {
		return nil, err
	}

	var coverImg *string

	if dto.CoverImage.Valid {
		path := s.config.ExternalAPI.CoverImageBaseURL + dto.CoverImage.String
		coverImg = &path
	}

	return &entity.Soundtrack{
		ID:         dto.ID,
		Title:      dto.Title,
		Author:     dto.Author,
		Duration:   int(dto.Duration),
		CoverImage: coverImg,
		Audio:      s.config.ExternalAPI.AudioBaseURL + dto.AudioFile,
		Attached:   dto.Attached,
		CreatorID:  dto.CreatorID,
		CreatedAt:  dto.CreatedAt,
	}, nil

}
