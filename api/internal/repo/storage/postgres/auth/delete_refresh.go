package auth

import (
	"context"
)

func (a *authStorage) DeleteRefreshToken(ctx context.Context, tokenID string) error {
	affectedRows, err := a.sqlc.DeleteRefreshToken(ctx, tokenID)
	if err != nil {
		return err
	}

	if affectedRows == 0 {
		return ErrRefreshNotExists
	}

	return nil
}
