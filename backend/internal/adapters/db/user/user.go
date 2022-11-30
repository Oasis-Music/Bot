package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
	"oasis/backend/internal/adapters/graph/models"

	"github.com/jackc/pgx/v4/pgxpool"
)

type userStorage struct {
	database *pgxpool.Pool
}

type UserStorage interface {
	GetRole(ctx context.Context, id int64) (string, error)
	UpdateUserVisitDate(ctx context.Context, id int64) error
	UpdateUser(ctx context.Context, params db.UpdateUserParams) (db.UpdateUserRow, error)
	CreateUser(ctx context.Context, params db.CreateUserParams) (db.CreateUserRow, error)
	GetUser(ctx context.Context, id int64) (db.UserDTO, error)
	GetUsersTraks(ctx context.Context, id int32, filter models.UserTracksFilter) ([]db.SoundtrackDTO, error)
	AddTrack(ctx context.Context, params db.AddTrackParams) error
	DeleteTrack(ctx context.Context, params db.DeleteTrackParams) (int64, error)
}

func NewUserStorage(db *pgxpool.Pool) UserStorage {
	return &userStorage{
		database: db,
	}
}
