package auth

import "context"

type AuthStorage interface {
	DeleteRefreshToken(ctx context.Context, id string) (int64, error)
	SaveRefreshToken(ctx context.Context, id string) error
}
