package user

import (
	"context"
	"oasis/api/internal/entity"

	"github.com/jackc/pgx/v4"
)

func (u *userService) User(ctx context.Context, id int64) (*entity.User, error) {

	user, err := u.storage.User(ctx, id)
	if err == pgx.ErrNoRows {
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, ErrGetUserFailed
	}

	return user, nil
}
