package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/graph/models"
	"strconv"

	"github.com/jackc/pgx/v4"
)

func (u *userService) GetUser(ctx context.Context, id string) (models.UserResult, error) {
	i, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, errors.New("invalid ID")
	}

	user, err := u.storage.GetUser(ctx, i)

	if err == pgx.ErrNoRows {
		return models.NotFound{
			Message: "user not found",
		}, nil
	} else if err != nil {
		return nil, err
	}

	return &models.User{
		ID:           strconv.FormatInt(user.ID, 10),
		FirstName:    user.FirstName,
		LastName:     user.LastName.ValueOrNil(),
		Username:     user.Username.ValueOrNil(),
		LanguageCode: user.LanguageCode.ValueOrNil(),
		VisitedAt:    user.VisitedAt.UTC().String(),
		CreatedAt:    user.CreatedAt.UTC().String(),
	}, nil
}
