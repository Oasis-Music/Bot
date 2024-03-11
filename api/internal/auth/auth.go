package auth

import (
	"context"
	"net/http"
	"oasis/api/internal/config"
	authStorage "oasis/api/internal/repo/storage/postgres/auth"
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

func NewAuthService(config *config.Config, db *pgxpool.Pool) AuthService {

	storage := authStorage.NewAuthStorage(db)

	return &authService{
		storage:  storage,
		atSecret: []byte(config.Auth.AccessSecret),
		rtSecret: []byte(config.Auth.RefreshSecret),
		atExpDur: time.Duration(config.Auth.AccessTTL) * time.Minute,
		rtExpDur: time.Duration(config.Auth.RefreshTTL) * time.Minute,
	}
}
