package user

import "context"

func (s *UserStorage) Role(ctx context.Context, id int64) (string, error) {
	return s.sqlc.GetUserRole(ctx)
}
