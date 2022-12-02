package user

import (
	"context"
	"strconv"
)

func (u *userService) GetRole(ctx context.Context, id string) (string, error) {
	userId, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return "", err
	}
	return u.storage.GetRole(ctx, userId)
}
