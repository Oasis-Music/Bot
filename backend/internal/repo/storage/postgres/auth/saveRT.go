package auth

import "context"

const SAVE_REFRESH_TOKEN_QUERY = "INSERT INTO auth_token (token_id) VALUES ($1)"

func (a *authStorage) SaveRefreshToken(ctx context.Context, tokenID string) error {
	_, err := a.database.Exec(context.Background(), SAVE_REFRESH_TOKEN_QUERY, tokenID)
	return err
}
