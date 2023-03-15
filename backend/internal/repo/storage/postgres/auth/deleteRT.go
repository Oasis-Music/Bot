package auth

import "context"

const DELETE_RT_QUERY = "DELETE FROM auth_token WHERE token_id = $1"

func (a *authStorage) DeleteRefreshToken(ctx context.Context, id string) (int64, error) {
	result, err := a.database.Exec(context.Background(), DELETE_RT_QUERY, id)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected(), nil
}
