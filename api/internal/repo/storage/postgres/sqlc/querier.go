// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.22.0

package sqlc

import (
	"context"
)

type Querier interface {
	CreateSoundtrack(ctx context.Context, arg CreateSoundtrackParams) (int32, error)
	DeleteSoundtrack(ctx context.Context, id int32) (int64, error)
	GetSoundtrack(ctx context.Context, arg GetSoundtrackParams) (GetSoundtrackRow, error)
	GetSoundtrackByTitle(ctx context.Context, arg GetSoundtrackByTitleParams) ([]GetSoundtrackByTitleRow, error)
}

var _ Querier = (*Queries)(nil)