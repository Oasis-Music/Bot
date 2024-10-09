package user

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
	userStorage "oasis/api/internal/repo/storage/postgres/user"
)

func (u *userService) User(ctx context.Context, id int64) (*entity.User, error) {

	user, err := u.storage.User(ctx, id)
	if err != nil {
		if errors.Is(err, userStorage.ErrUserNotFound) {
			u.logger.WarnContext(ctx, "user not found", "requested_user", id)
			return nil, ErrUserNotFound
		}
		return nil, ErrGetUserFailed
	}

	u.logger.InfoContext(ctx, "get user", "requested_user", id)
	return user, nil

}
