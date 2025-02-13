package user

import (
	"context"
	"errors"
	"fmt"
	"oasis/api/internal/services/user/entities"
)

func (u userService) User(ctx context.Context, id int64) (*entities.User, error) {

	user, err := u.storageV2.User(ctx, id)
	if err != nil {
		if errors.Is(err, ErrStorageNoData) {
			u.logger.Warn("user not found", "user_id", id)
			return nil, fmt.Errorf("(%d) %w", id, ErrUserNotFound)
		}

		u.logger.Error("get user", "user_id", id, "error", err)
		return nil, ErrFailedGetUser
	}

	u.logger.Info("get user", "user_id", id)

	return user, nil
}
