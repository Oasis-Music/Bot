package auth

import "context"

type Service interface {
	RefreshToken(ctx context.Context) string
}
