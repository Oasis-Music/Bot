package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *UserStorage) UpdateUser(ctx context.Context, params entity.UserUpdate) (*entity.UserUpdateResult, error) {
	updatedUser, err := s.sqlc.UpdateUser(ctx, sqlc.UpdateUserParams{
		ID:           params.ID,
		FirstName:    params.FirstName,
		LastName:     postgres.NewNullPtrString(params.LastName),
		Username:     postgres.NewNullPtrString(params.Username),
		LanguageCode: postgres.NewNullPtrString(params.LanguageCode),
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
