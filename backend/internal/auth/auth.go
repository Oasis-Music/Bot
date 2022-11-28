package auth

import (
	"context"
	"net/http"
	authStorage "oasis/backend/internal/adapters/db/auth"
	"oasis/backend/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authService struct {
	storage            authStorage.AuthStorage
	accessTokenSecret  []byte
	refreshTokenSecret []byte
}

type AuthService interface {
	RevokeRefreshToken(ctx context.Context, id string) error
	SaveRefreshToken(ctx context.Context, token RawTokenPair) error // TODO: RawTokenPair isn't right
	CreateJwtPair(userID int64, firstName string) (RawTokenPair, error)
	AuthMiddleware(next http.Handler) http.Handler
	ParseRefreshToken(string) (*refreshToken, error)
}

func NewAuthService(config *config.AppConfig, db *pgxpool.Pool) AuthService {

	storage := authStorage.NewAuthStorage(db)

	return &authService{
		storage:            storage,
		accessTokenSecret:  []byte(config.JwtSecret),
		refreshTokenSecret: []byte(config.RefreshJwtSecret),
	}
}
