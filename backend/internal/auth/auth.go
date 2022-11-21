package auth

import (
	"oasis/backend/internal/config"

	"github.com/jackc/pgx/v4/pgxpool"
)

type authService struct {
	storage          *pgxpool.Pool
	jwtSecret        []byte
	refreshJwtSecret []byte
}

type AuthService interface {
	CreateJwtPair(userID int64, firstName string) (RawTokenPair, error)
}

func NewAuthService(config *config.AppConfig, db *pgxpool.Pool) AuthService {
	return &authService{
		storage:          db,
		jwtSecret:        []byte(config.JwtSecret),
		refreshJwtSecret: []byte(config.RefreshJwtSecret),
	}
}
