package user

import (
	"context"
	"oasis/api/internal/entity"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *UserStorage) UpdateUser(ctx context.Context, params entity.UserUpdate) (*entity.UserUpdateResult, error) {
	updatedUser, err := s.sqlc.UpdateUser(ctx, sqlc.UpdateUserParams{
		ID:           params.ID,
		FirstName:    params.FirstName,
		LastName:     dbnull.NewNullString(params.LastName),
		Username:     dbnull.NewNullString(params.Username),
		LanguageCode: dbnull.NewNullString(params.LanguageCode),
		VisitedAt:    params.VisitedAt,
	})

	if err != nil {
		return nil, err
	}

	return &entity.UserUpdateResult{
		ID:        updatedUser.ID,
		FirstName: updatedUser.FirstName,
	}, nil
}
