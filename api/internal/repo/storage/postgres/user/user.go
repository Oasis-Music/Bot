package user

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"

	"github.com/jackc/pgx/v4"
)

func (s *UserStorage) User(ctx context.Context, id int64) (*entity.User, error) {
	data, err := s.sqlc.GetUser(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		s.logger.Warn("user/storage - user", "error", err)
		return nil, ErrFailedToGetUserInternal
	}

	user := postgres.UserFromDTO(postgres.UserDTO(data))

	return &user, nil
}
