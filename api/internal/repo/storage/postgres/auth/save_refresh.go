package auth

import (
	"context"
)

func (a *authStorage) SaveRefreshToken(ctx context.Context, tokenID string) error {
	return a.sqlc.SaveRefreshToken(ctx, tokenID)
}
