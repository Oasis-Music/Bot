package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

func (s *UserStorage) User(ctx context.Context, id int64) (*entity.User, error) {
	data, err := s.sqlc.GetUser(ctx, id)
	if err != nil {
		return nil, err
	}

	user := postgres.UserFromDTO(postgres.UserDTO(data))

	return &user, nil
}
