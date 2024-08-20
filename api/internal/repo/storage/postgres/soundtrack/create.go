package soundtrack

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *soundtrackStorage) Create(ctx context.Context, track entity.NewSoundtrack, hash string) (int32, error) {

	tx, err := s.db.Begin(ctx)
	if err != nil {
		s.logger.Error("storage: create soundtrack/begin", "error", err)
		return -1, err
	}

	defer tx.Rollback(ctx)

	qtx := s.sqlc.WithTx(tx)

	trackID, err := qtx.CreateSoundtrack(ctx, sqlc.CreateSoundtrackParams{
		Title:       track.Title,
		Author:      track.Author,
		Duration:    track.Duration,
		CoverImage:  postgres.NewNullPtrString(track.CoverImage),
		AudioFile:   track.AudioFile,
		IsValidated: track.IsValidated,
		CreatorID:   track.CreatorID,
	})
	if err != nil {
		s.logger.Error("storage: create soundtrack", "error", err)
		return -1, err
	}

	err = qtx.SaveSoundtrackHash(ctx, sqlc.SaveSoundtrackHashParams{
		Hash:         hash,
		SoundtrackID: postgres.NewNullInt32(trackID),
	})
	if err != nil {
		s.logger.Error("storage: create soundtrack/save hash", "error", err)
		return -1, err
	}

	err = tx.Commit(ctx)
	if err != nil {
		s.logger.Error("storage: create soundtrack/commit", "error", err)
		return -1, err
	}

	return trackID, nil
}
