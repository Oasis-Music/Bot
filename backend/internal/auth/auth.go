package auth

import (
	"context"
	"net/http"
	authStorage "oasis/backend/internal/adapters/db/auth"
	"oasis/backend/internal/config"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authService struct {
	storage  authStorage.AuthStorage
	atSecret []byte
	rtSecret []byte
	atExpDur time.Duration
	rtExpDur time.Duration
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
		storage:  storage,
		atSecret: []byte(config.Auth.ATsecret),
		rtSecret: []byte(config.Auth.RTsecret),
		atExpDur: time.Duration(config.Auth.ATexpMin) * time.Minute,
		rtExpDur: time.Duration(config.Auth.RTexpMin) * time.Minute,
	}
}
