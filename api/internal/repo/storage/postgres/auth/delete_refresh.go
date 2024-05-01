package auth

import (
	"context"
)

func (a *authStorage) DeleteRefreshToken(ctx context.Context, tokenID string) (int64, error) {
	return a.sqlc.DeleteRefreshToken(ctx, tokenID)
}
