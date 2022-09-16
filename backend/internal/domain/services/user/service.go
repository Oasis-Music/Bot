package user

import (
	"context"
	"oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/adapters/graph/models"
)

type UserService interface {
	GetUser(ctx context.Context, id string) (models.UserResult, error)
}

type userService struct {
	storage user.UserStorage
}

func NewUserService(storage user.UserStorage) UserService {
	return &userService{
		storage: storage,
	}
}
