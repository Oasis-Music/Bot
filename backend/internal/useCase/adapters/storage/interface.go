package storage

import (
	"context"
	"oasis/backend/internal/entity"
)

type Soundtrack interface {
	Soundtrack(ctx context.Context, id int32, userID int64) (*entity.Soundtrack, error)
	AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) ([]entity.Soundtrack, error)
	Create(ctx context.Context, params entity.NewSoundtrack) (int32, error)
	Delete(ctx context.Context, id int32) (int64, error)
	Search(ctx context.Context, value string, userID int64) ([]entity.Soundtrack, error)
}

type User interface {
	GetUserTracks(ctx context.Context, id int64, options entity.UserTracksOptions) (*entity.UserTracks, error)
	GetRole(ctx context.Context, id int64) (string, error)
	UpdateUserVisitDate(ctx context.Context, id int64) error
	UpdateUser(ctx context.Context, params entity.UserUpdate) (entity.UserUpdateResult, error)
	CreateUser(ctx context.Context, user entity.NewUser) (entity.NewUserResult, error)
	GetUser(ctx context.Context, id int64) (*entity.User, error)
	AttachSoundtrack(ctx context.Context, params entity.AttachSoundtrackToUserParams) error
	UnattachSoundtrack(ctx context.Context, params entity.UnattachSoundtrackFromUserParams) (int64, error)
	GetUsers(ctx context.Context, ids []int64) ([]entity.User, error)
}
