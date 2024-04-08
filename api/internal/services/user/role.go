package user

import (
	"context"
)

func (u *userService) Role(ctx context.Context, id int64) (string, error) {
	return u.storage.Role(ctx, id)
}
