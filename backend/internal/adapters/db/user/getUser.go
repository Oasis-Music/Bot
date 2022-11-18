package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const GET_USER_QUERY = `
SELECT id,
	first_name,
	last_name,
	username,
	language_code,
	visited_at,
	created_at
FROM users
WHERE id = $1;
`

func (s *userStorage) GetUser(ctx context.Context, id int64) (db.UserDTO, error) {

	row := s.database.QueryRow(context.Background(), GET_USER_QUERY, id)

	var dto db.UserDTO
	err := row.Scan(
		&dto.ID,
		&dto.FirstName,
		&dto.LastName,
		&dto.Username,
		&dto.LanguageCode,
		&dto.VisitedAt,
		&dto.CreatedAt,
	)

	return dto, err
}
