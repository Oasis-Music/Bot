package postgres

import (
	"context"
	"oasis/api/internal/services/user/entities"
	"oasis/api/internal/services/user/repo/postgres/sqlc"
	"oasis/api/pkg/postgres"
)

func (s *storage) CreateUser(ctx context.Context, user entities.NewUser) (*entities.NewUserResult, error) {

	data, err := s.sqlc.CreateUser(ctx, sqlc.CreateUserParams{
		UserID:       user.Id,
		FirstName:    user.FirstName,
		LastName:     postgres.NewNullString(user.LastName),
		TgUsername:   postgres.NewNullString(user.Username),
		LanguageCode: postgres.NewNullString(user.LanguageCode),
		TgPhotoUrl:   postgres.NewNullString(user.PhotoURL),
		TgPremium:    user.HasTgPremium,
		RoleID:       1, // user role
	})
	if err != nil {
		s.logger.Error("db: create user", "error", err)
		return nil, err
	}

	return &entities.NewUserResult{
		UserId:    data.UserID,
		FirstName: data.FirstName,
	}, nil

}
