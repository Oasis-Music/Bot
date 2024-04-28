package auth

import (
	"context"
	"log/slog"
	"net/http"
	"oasis/api/internal/config"
	"time"
)

type authService struct {
	storage  AuthStorage
	logger   *slog.Logger
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

func New(config *config.Config, logger *slog.Logger, storage AuthStorage) Service {

	return &authService{
		storage:  storage,
		logger:   logger,
		atSecret: []byte(config.Auth.AccessSecret),
		rtSecret: []byte(config.Auth.RefreshSecret),
		atExpIn:  time.Duration(config.Auth.AccessTTL) * time.Minute,
		rtExpIn:  time.Duration(config.Auth.RefreshTTL) * time.Minute,
	}
}
