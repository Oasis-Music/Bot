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
	GetUser(ctx context.Context, id int32) (db.UserDTO, error)
	GetUsersTraks(ctx context.Context, id int32, filter models.UserTracksFilter) ([]db.SoundtrackDTO, error)
	AddTrack(ctx context.Context, params db.AddTrackParams) error
}

func NewUserStorage(db *pgxpool.Pool) UserStorage {
	return &userStorage{
		database: db,
	}
}
