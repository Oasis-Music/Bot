package auth

import "context"

func (a *authService) SaveRefreshToken(ctx context.Context, raw RawTokenPair) error {
	return a.storage.SaveRefreshToken(ctx, raw.RtID)
}

func (a *authService) RevokeRefreshToken(ctx context.Context, id string) error {
	return a.storage.DeleteRefreshToken(ctx, id)
}
