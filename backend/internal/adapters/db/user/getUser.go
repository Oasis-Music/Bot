package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const GET_USER_QUERY = `
SELECT id,
	tg_id,
	created_at
FROM users
WHERE id = $1;
`

func (s *userStorage) GetUser(ctx context.Context, id int32) (db.UserDTO, error) {

	row := s.database.QueryRow(context.Background(), GET_USER_QUERY, id)

	var dto db.UserDTO
	err := row.Scan(
		&dto.ID,
		&dto.TgID,
		&dto.CreatedAt,
	)

	return dto, err
}
