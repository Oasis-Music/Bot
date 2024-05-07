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
			u.logger.Info("user not found", "user_id", id)
			return nil, ErrUserNotFound
		}
		return nil, ErrGetUserFailed
	}

	u.logger.Info("user request", "user_id", id)
	return user, nil

}
