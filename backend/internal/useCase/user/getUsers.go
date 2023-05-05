package user

import (
	"context"
	"log"
	"oasis/backend/internal/entity"

	"github.com/jackc/pgx/v4"
)

func (u *userUseCase) GetUsers(ctx context.Context, ids []int64) ([]entity.User, error) {

	users, err := u.storage.GetUsers(ctx, ids)
	if err == pgx.ErrNoRows {
		log.Println("GetUsers fethed no rows")
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, err
	}

	return users, err
}
