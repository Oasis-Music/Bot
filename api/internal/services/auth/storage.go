package auth

import (
	"context"
	"fmt"
	"oasis/api/internal/services/auth/entities"
)

func (a *authService) SaveRefreshToken(ctx context.Context, raw entities.TokenPair) error {

	err := a.storage.SaveRefreshToken(ctx, raw.RtID, raw.RtExpiresAt.Local())
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

func (a *authService) UserRole(ctx context.Context, userId int64) (string, error) {
	role, err := a.storage.UserRole(ctx, userId)
	if err != nil {
		a.logger.Error("auth-db: get user role", "error", err)
		return "", fmt.Errorf("failed to get user(%d) role", userId)
	}

	return role, nil
}
