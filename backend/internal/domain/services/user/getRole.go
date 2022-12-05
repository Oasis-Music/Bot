package user

import (
	"context"
)

func (u *userService) GetRole(ctx context.Context, id int64) (string, error) {
	return u.storage.GetRole(ctx, id)
}
