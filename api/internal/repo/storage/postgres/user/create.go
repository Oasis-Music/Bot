package user

import (
	"context"
	"fmt"
	"oasis/api/internal/entity"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *UserStorage) CreateUser(ctx context.Context, params entity.NewUser) (*entity.NewUserResult, error) {
	newUser, err := s.sqlc.CreateUser(ctx, sqlc.CreateUserParams{
		ID:           params.ID,
		FirstName:    params.FirstName,
		LastName:     dbnull.NewNullString(params.LastName),
		Username:     dbnull.NewNullString(params.Username),
		LanguageCode: dbnull.NewNullString(params.LanguageCode),
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
