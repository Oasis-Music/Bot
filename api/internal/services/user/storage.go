package user

import (
	"context"
	"oasis/api/internal/entity"
)

type UserStorage interface {
	User(ctx context.Context, id int64) (*entity.User, error)
	Role(ctx context.Context, id int64) (string, error)
	UserSoundtracks(ctx context.Context, id int64, options entity.UserTracksOptions) (*entity.UserTracks, error)
	UpdateUserVisitDate(ctx context.Context, id int64) error
	UpdateUser(ctx context.Context, params entity.UserUpdate) (*entity.UserUpdateResult, error)
	CreateUser(ctx context.Context, user entity.NewUser) (*entity.NewUserResult, error)
	AttachSoundtrack(ctx context.Context, params entity.AttachSoundtrackToUserParams) error
	UnattachSoundtrack(ctx context.Context, params entity.UnattachSoundtrackFromUserParams) (int64, error)
	UsersByID(ctx context.Context, ids []int64) ([]entity.User, error)
}
