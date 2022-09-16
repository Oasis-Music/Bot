package user

import (
	"context"
	"oasis/backend/internal/adapters/db"

	"github.com/jackc/pgx/v4/pgxpool"
)

type userStorage struct {
	database *pgxpool.Pool
}

type UserStorage interface {
	GetUser(ctx context.Context, id int32) (db.UserDTO, error)
}

func NewUserStorage(db *pgxpool.Pool) UserStorage {
	return &userStorage{
		database: db,
	}
}
