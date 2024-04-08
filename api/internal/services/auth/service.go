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
	atExpIn  time.Duration
	rtExpIn  time.Duration
}

type Service interface {
	RevokeRefreshToken(ctx context.Context, id string) error
	SaveRefreshToken(ctx context.Context, token RawTokenPair) error // TODO: RawTokenPair isn't right
	CreateJwtPair(userID int64, firstName string) (RawTokenPair, error)
	AuthMiddleware(next http.Handler) http.Handler
	ParseRefreshToken(string) (*refreshToken, error)
}

func New(config *config.Config, db *pgxpool.Pool) Service {

	storage := authStorage.NewAuthStorage(db)

	return &authService{
		storage:  storage,
		atSecret: []byte(config.Auth.AccessSecret),
		rtSecret: []byte(config.Auth.RefreshSecret),
		atExpIn:  time.Duration(config.Auth.AccessTTL) * time.Minute,
		rtExpIn:  time.Duration(config.Auth.RefreshTTL) * time.Minute,
	}
}
