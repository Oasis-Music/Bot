package user

import (
	"context"
	"fmt"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *UserStorage) CreateUser(ctx context.Context, params entity.NewUser) (*entity.NewUserResult, error) {
	newUser, err := s.sqlc.CreateUser(ctx, sqlc.CreateUserParams{
		ID:           params.ID,
		FirstName:    params.FirstName,
		LastName:     postgres.NewNullPtrString(params.LastName),
		Username:     postgres.NewNullPtrString(params.Username),
		LanguageCode: postgres.NewNullPtrString(params.LanguageCode),
		UserRole:     params.Role,
	})

	if err != nil {
		fmt.Println("error createUser DB", err)
		return nil, err
	}

	return &entity.NewUserResult{
		ID:        newUser.ID,
		FirstName: newUser.FirstName,
	}, nil
}
