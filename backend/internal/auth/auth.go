package auth

import (
	"context"
	authStorage "oasis/backend/internal/adapters/db/auth"
	"oasis/backend/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authService struct {
	storage          authStorage.AuthStorage
	jwtSecret        []byte
	refreshJwtSecret []byte
}

type AuthService interface {
	SaveRefreshToken(ctx context.Context, token RawTokenPair) error
	CreateJwtPair(userID int64, firstName string) (RawTokenPair, error)
}

func NewAuthService(config *config.AppConfig, db *pgxpool.Pool) AuthService {

	storage := authStorage.NewAuthStorage(db)

	return &authService{
		storage:          storage,
		jwtSecret:        []byte(config.JwtSecret),
		refreshJwtSecret: []byte(config.RefreshJwtSecret),
	}
}
