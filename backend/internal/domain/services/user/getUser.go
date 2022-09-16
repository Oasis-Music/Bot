package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"

	"github.com/jackc/pgx/v4"
)

func (u *userService) GetUser(ctx context.Context, id string) (models.UserResult, error) {
	i, err := strconv.Atoi(id)
	if err != nil {
		return nil, errors.New("invalid ID")
	}

	user, err := u.storage.GetUser(ctx, int32(i))

	if err == pgx.ErrNoRows {
		return models.NotFound{
			Message: "user not found",
		}, nil
	} else if err != nil {
		return nil, err
	}

	return &models.User{
		ID:         strconv.Itoa(int(user.ID)),
		TelegramID: user.TgID,
		CreatedAt:  user.CreatedAt.UTC().String(),
	}, nil
}
