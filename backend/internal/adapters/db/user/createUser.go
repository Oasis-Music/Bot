package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const CREATE_USER_QUERY = `
INSERT INTO users
		(
			id,
			first_name,
			last_name,
			username,
			language_code
		)
		VALUES
		(
			$1,
			$2,
			$3,
			$4,
			$5
		)
	RETURNING id, first_name;
`

func (s *userStorage) CreateUser(ctx context.Context, params db.CreateUserParams) (db.CreateUserRow, error) {

	row := s.database.QueryRow(context.Background(), CREATE_USER_QUERY,
		params.ID,
		params.FirstName,
		params.LastName,
		params.Username,
		params.LanguageCode,
	)
	var i db.CreateUserRow
	err := row.Scan(&i.ID, &i.FirstName)
	return i, err
}
