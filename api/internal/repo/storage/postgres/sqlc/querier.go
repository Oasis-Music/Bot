// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package sqlc

import (
	"context"
)

type Querier interface {
	AttachSoundtrack(ctx context.Context, arg AttachSoundtrackParams) error
	CreateSoundtrack(ctx context.Context, arg CreateSoundtrackParams) (int32, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (CreateUserRow, error)
	DeleteRefreshToken(ctx context.Context, refreshTokenID string) (int64, error)
	DeleteSoundtrack(ctx context.Context, id int32) (int64, error)
	GetSoundtrack(ctx context.Context, arg GetSoundtrackParams) (GetSoundtrackRow, error)
	GetSoundtrackByTitle(ctx context.Context, arg GetSoundtrackByTitleParams) ([]GetSoundtrackByTitleRow, error)
	GetUser(ctx context.Context, id int64) (User, error)
	GetUserRole(ctx context.Context) (string, error)
	GetUsersByID(ctx context.Context, dollar_1 []int64) ([]User, error)
	SaveRefreshToken(ctx context.Context, refreshTokenID string) error
	UnattachSoundtrack(ctx context.Context, arg UnattachSoundtrackParams) (int64, error)
	UpdateUser(ctx context.Context, arg UpdateUserParams) (UpdateUserRow, error)
}

var _ Querier = (*Queries)(nil)
