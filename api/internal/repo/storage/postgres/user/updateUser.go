package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
)

const USER_UPDATE_QUERY = `
UPDATE users
SET first_name = $2,
    last_name = $3,
    username = $4,
	language_code = $5,
	visited_at = $6
WHERE id = $1 RETURNING id, first_name
`

func (s *UserStorage) UpdateUser(ctx context.Context, update entity.UserUpdate) (entity.UserUpdateResult, error) {

	nullString := dbnull.NewNullString("", false)

	lastName := nullString
	if update.LastName != nil {
		lastName = dbnull.NewNullString(*update.LastName, true)
	}

	username := nullString
	if update.Username != nil {
		username = dbnull.NewNullString(*update.Username, true)
	}

	languageCode := nullString
	if update.LanguageCode != nil {
		languageCode = dbnull.NewNullString(*update.LanguageCode, true)
	}

	params := postgres.UpdateUserParams{
		ID:           update.ID,
		FirstName:    update.FirstName,
		LastName:     lastName,
		Username:     username,
		LanguageCode: languageCode,
		VisitedAt:    update.VisitedAt,
	}

	row := s.database.QueryRow(context.Background(), USER_UPDATE_QUERY,
		params.ID,
		params.FirstName,
		params.LastName,
		params.Username,
		params.LanguageCode,
		params.VisitedAt,
	)
	var user entity.UserUpdateResult
	err := row.Scan(&user.ID, &user.FirstName)
	return user, err
}
