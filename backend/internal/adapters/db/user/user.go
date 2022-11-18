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
