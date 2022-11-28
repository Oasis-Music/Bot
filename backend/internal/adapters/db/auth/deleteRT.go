package auth

import "context"

const DELETE_RT_QUERY = "DELETE FROM auth_token WHERE token_id = $1"

func (a *authStorage) DeleteRefreshToken(ctx context.Context, id string) error {
	_, err := a.database.Exec(context.Background(), DELETE_RT_QUERY, id)
	return err
}
