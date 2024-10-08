package soundtrack

import (
	"context"
	"errors"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/s3"
	"strings"
	"sync"
)

func (s *soundtrackService) Delete(ctx context.Context, id int32) (bool, error) {

	soundtrack, err := s.Soundtrack(ctx, id)
	if err != nil {
		return false, err
	}

	extractName := func(src string) string {
		parts := strings.Split(src, "/")
		return parts[len(parts)-1]
	}

	if soundtrack.ID != id {
		msg := "anomaly of tracks existence"
		s.logger.WarnContext(ctx, msg)
		return false, errors.New(msg)
	}

	keys := make([]string, 0, 2)
	keys = append(keys, s3.AudioPrefix+extractName(soundtrack.Audio))

	if soundtrack.CoverImage != "" {
		keys = append(keys, s3.CoverPrefix+extractName(soundtrack.CoverImage))
	}

	results := make(chan error, len(keys))

	var wg sync.WaitGroup
	wg.Add(len(keys))

	for _, key := range keys {
		if key != "" {
			go func() {
				defer wg.Done()
				_, err := s.s3store.DeleteObject(context.Background(), key)
				if err != nil {
					s.logger.ErrorContext(ctx, "delete with soundtrack S3", "err", err)
					results <- err
				}
			}()
		}
	}

	wg.Wait()
	close(results)

	if len(results) != 0 {
		s.logger.ErrorContext(ctx, "soundtrack: failed to delete S3 data during soundtrack deletion")
		return false, ErrInternalDeleteSoundtrack
	}

	success, err := s.storage.Delete(ctx, id)
	if err != nil {
		if errors.Is(err, postgres.ErrSoundtrackNotFound) {
			return false, ErrSoundtrackNotFound
		}

		return false, ErrInternalDeleteSoundtrack
	}

	if !success {
		return false, ErrSoundtrackNotFound
	}

	s.logger.InfoContext(ctx, "soundtrack: delete", "id", id)

	return success, nil
}
