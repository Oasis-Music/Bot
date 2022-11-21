package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const updateAUser = `
UPDATE users
SET first_name = $2,
    last_name = $3,
    username = $4,
	language_code = $5,
	visited_at = $6
WHERE id = $1 RETURNING id, first_name
`

func (s *userStorage) UpdateUser(ctx context.Context, params db.UpdateUserParams) (db.UpdateUserRow, error) {
	row := s.database.QueryRow(context.Background(), updateAUser,
		params.ID,
		params.FirstName,
		params.LastName,
		params.Username,
		params.LanguageCode,
		params.VisitedAt,
	)
	var i db.UpdateUserRow
	err := row.Scan(&i.ID, &i.FirstName)
	return i, err
}
