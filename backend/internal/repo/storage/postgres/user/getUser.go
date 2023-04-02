package user

import (
	"context"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"
)

const GET_USER_QUERY = `
SELECT id,
	first_name,
	last_name,
	username,
	language_code,
	role,
	visited_at,
	created_at
FROM users
WHERE id = $1;
`

func (s *UserStorage) GetUser(ctx context.Context, id int64) (*entity.User, error) {

	row := s.database.QueryRow(context.Background(), GET_USER_QUERY, id)

	var dto postgres.UserDTO
	err := row.Scan(
		&dto.ID,
		&dto.FirstName,
		&dto.LastName,
		&dto.Username,
		&dto.LanguageCode,
		&dto.Role,
		&dto.VisitedAt,
		&dto.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &entity.User{
		ID:           dto.ID,
		FirstName:    dto.FirstName,
		LastName:     dto.LastName.ValueOrNil(),
		Username:     dto.Username.ValueOrNil(),
		LanguageCode: dto.LanguageCode.ValueOrNil(),
		Role:         string(dto.Role),
		VisitedAt:    dto.VisitedAt,
		CreatedAt:    dto.CreatedAt,
	}, nil

}
