package auth

import (
	"context"
	"net/http"
	authStorage "oasis/backend/internal/adapters/db/auth"
	"oasis/backend/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authService struct {
	storage           authStorage.AuthStorage
	accessTokenSecret []byte
	refreshJwtSecret  []byte
}

type AuthService interface {
	SaveRefreshToken(ctx context.Context, token RawTokenPair) error
	CreateJwtPair(userID int64, firstName string) (RawTokenPair, error)
	AuthMiddleware(next http.Handler) http.Handler
}

func NewAuthService(config *config.AppConfig, db *pgxpool.Pool) AuthService {

	storage := authStorage.NewAuthStorage(db)

	return &authService{
		storage:           storage,
		accessTokenSecret: []byte(config.JwtSecret),
		refreshJwtSecret:  []byte(config.RefreshJwtSecret),
	}
}
