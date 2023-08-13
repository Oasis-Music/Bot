package user

import (
	"context"
	"log"
	"oasis/api/internal/entity"

	"github.com/jackc/pgx/v4"
)

func (u *userUseCase) Users(ctx context.Context, ids []int64) ([]entity.User, error) {

	users, err := u.storage.Users(ctx, ids)
	if err == pgx.ErrNoRows {
		log.Println("GetUsers fethed no rows")
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, err
	}

	return users, err
}
