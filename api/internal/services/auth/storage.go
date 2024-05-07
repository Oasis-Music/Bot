package auth

import (
	"context"
)

type AuthStorage interface {
	DeleteRefreshToken(ctx context.Context, id string) error
	SaveRefreshToken(ctx context.Context, id string) error
}

func (a *authService) SaveRefreshToken(ctx context.Context, raw RawTokenPair) error {
	err := a.storage.SaveRefreshToken(ctx, raw.RtID)
	if err != nil {
		a.logger.Error("save RT/storage", "error", err)
		return ErrFailToSaveRT
	}
	return nil
}

func (a *authService) RevokeRefreshToken(ctx context.Context, id string) error {
	err := a.storage.DeleteRefreshToken(ctx, id)
	if err != nil {
		a.logger.Error("revoke RT/storage", "error", err)
		return ErrRefreshNotExists
	}

	return nil
}
