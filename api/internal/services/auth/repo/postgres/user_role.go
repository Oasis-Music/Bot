package postgres

import "context"

func (a *authStorage) UserRole(ctx context.Context, userId int64) (string, error) {
	return a.sqlc.GetUserRole(ctx, userId)
}
