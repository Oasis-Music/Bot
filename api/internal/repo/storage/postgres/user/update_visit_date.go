package user

import (
	"context"
	"oasis/api/internal/repo/storage/postgres/sqlc"
	"time"
)

func (s *UserStorage) UpdateVisitDate(ctx context.Context, userID int64) error {
	return s.sqlc.UpdateVisitDate(ctx, sqlc.UpdateVisitDateParams{
		ID:        userID,
		VisitedAt: time.Now(),
	})
}
