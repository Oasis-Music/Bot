package soundtrack

import (
	"context"
	"fmt"
	"oasis/backend/internal/domain/entity"

	"github.com/jackc/pgx/v4"
)

func (s *soundtrackService) GetSoundtrack(ctx context.Context, id int32) (*entity.Soundtrack, error) {

	userID := s.extractCtxUserId(ctx)

	track, err := s.storage.GetSoundtrack(ctx, id, userID)

	if err == pgx.ErrNoRows {
		return nil, ErrSoundtrackNotFound
	} else if err != nil {
		fmt.Println(err)
		return nil, ErrFailedToFetchSoundtrack
	}

	var coverImg *string

	if track.CoverImage.Valid {
		path := s.config.ExternalAPI.CoverImageBaseURL + track.CoverImage.String
		coverImg = &path
	}

	return &entity.Soundtrack{
		ID:         track.ID,
		Title:      track.Title,
		Author:     track.Author,
		Duration:   int(track.Duration),
		CoverImage: coverImg,
		Audio:      s.config.ExternalAPI.AudioBaseURL + track.AudioFile,
		Attached:   track.Attached,
		CreatorID:  track.CreatorID,
		CreatedAt:  track.CreatedAt,
	}, nil
}
