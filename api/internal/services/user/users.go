package user

import (
	"context"
	"oasis/api/internal/entity"
)

func (u *userService) UsersByID(ctx context.Context, ids []int64) ([]entity.User, error) {
	users, err := u.storage.UsersByID(ctx, ids)
	if err != nil {
		return nil, ErrUserNotFound
	}

	return users, err
}
