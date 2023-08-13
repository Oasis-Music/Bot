package user

import (
	"context"
	"oasis/api/internal/entity"

	"github.com/jackc/pgx/v4"
)

func (u *userUseCase) User(ctx context.Context, id int64) (*entity.User, error) {

	user, err := u.storage.User(ctx, id)
	if err == pgx.ErrNoRows {
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, err
	}

	return &entity.User{
		ID:           user.ID,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Username:     user.Username,
		LanguageCode: user.LanguageCode,
		Role:         string(user.Role),
		VisitedAt:    user.VisitedAt,
		CreatedAt:    user.CreatedAt,
	}, nil
}
