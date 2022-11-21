package auth

import "context"

func (a *authService) SaveRefreshToken(ctx context.Context, raw RawTokenPair) error {
	return a.storage.SaveRefreshToken(ctx, raw.RtID)
}
