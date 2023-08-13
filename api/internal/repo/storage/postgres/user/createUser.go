package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
)

const CREATE_USER_QUERY = `
INSERT INTO users
		(
			id,
			first_name,
			last_name,
			username,
			language_code,
			role
		)
		VALUES
		(
			$1,
			$2,
			$3,
			$4,
			$5,
			$6
		)
	RETURNING id, first_name;
`

func (s *UserStorage) CreateUser(ctx context.Context, user entity.NewUser) (entity.NewUserResult, error) {

	// TODO: what if dbnull.NewNullString() got empty pointer
	params := postgres.CreateUserParams{
		ID:           user.ID,
		FirstName:    user.FirstName,
		LastName:     dbnull.NewNullString(*user.LastName, true),
		Username:     dbnull.NewNullString(*user.Username, true),
		LanguageCode: dbnull.NewNullString(*user.LanguageCode, true),
		Role:         postgres.RoleType(user.Role),
	}

	row := s.database.QueryRow(context.Background(), CREATE_USER_QUERY,
		params.ID,
		params.FirstName,
		params.LastName,
		params.Username,
		params.LanguageCode,
		params.Role,
	)
	var i entity.NewUserResult
	err := row.Scan(&i.ID, &i.FirstName)
	return i, err
}
