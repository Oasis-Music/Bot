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
	GetRole(ctx context.Context, id int64) (string, error)
	UpdateUserVisitDate(ctx context.Context, id int64) error
	UpdateUser(ctx context.Context, params db.UpdateUserParams) (db.UpdateUserRow, error)
	CreateUser(ctx context.Context, params db.CreateUserParams) (db.CreateUserRow, error)
	GetUser(ctx context.Context, id int64) (db.UserDTO, error)
	GetUserTracks(ctx context.Context, id int64, filter db.UserTracksFilterParams) ([]db.SoundtrackDTO, error)
	AttachSoundtrack(ctx context.Context, params db.AttachSoundtrackParams) error
	UnattachSoundtrack(ctx context.Context, params db.UnattachSoundtrackParams) (int64, error)
}

func NewUserStorage(db *pgxpool.Pool) UserStorage {
	return &userStorage{
		database: db,
	}
}
