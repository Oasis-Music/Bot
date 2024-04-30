package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
)

func (s *UserStorage) UsersByID(ctx context.Context, ids []int64) ([]entity.User, error) {
	data, err := s.sqlc.GetUsersByID(ctx, ids)
	if err != nil {
		return nil, err
	}

	users := make([]entity.User, 0, len(data))

	for _, user := range data {
		users = append(users, postgres.UserFromDTO(postgres.UserDTO(user)))
	}

	return users, nil
}
