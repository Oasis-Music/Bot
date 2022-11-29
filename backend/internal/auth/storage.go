package auth

import (
	"context"
)

func (a *authService) SaveRefreshToken(ctx context.Context, raw RawTokenPair) error {
	return a.storage.SaveRefreshToken(ctx, raw.RtID)
}

func (a *authService) RevokeRefreshToken(ctx context.Context, id string) error {
	affectedRows, err := a.storage.DeleteRefreshToken(ctx, id)
	if err != nil {
		return err
	}
	if affectedRows == 0 {
		return ErrDeleteNonexistentToken
	}

	return nil
}
