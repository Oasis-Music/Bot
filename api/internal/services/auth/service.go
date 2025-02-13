package auth

import (
	"context"
	"log/slog"
	"net/http"
	"oasis/api/internal/config"
	"oasis/api/internal/services/auth/entities"
	"oasis/api/internal/services/auth/repo/postgres"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v4/pgxpool"
)

type AuthStorage interface {
	SaveRefreshToken(ctx context.Context, id uuid.UUID, expiresAt time.Time) error
	DeleteRefreshToken(ctx context.Context, id string) error
	UserRole(ctx context.Context, userID int64) (string, error)
}

type authService struct {
	config  *config.Config
	storage AuthStorage
	logger  *slog.Logger
	meta    meta
}

// To avoid unnecessary copying of strings in memory when converting []byte
type meta struct {
	atSecret          []byte
	rtSecret          []byte
	telegramToken     []byte
	sessionTTL        time.Duration
	sessionRefreshTTL time.Duration
	tgAuthFreshIn     time.Duration
}

type Service interface {
	RevokeRefreshToken(ctx context.Context, id string) error
	SaveRefreshToken(ctx context.Context, token entities.TokenPair) error
	CreateJwtPair(payload entities.JwtPairPayload) (entities.TokenPair, error)
	AuthMiddleware(next http.Handler) http.Handler
	ParseRefreshToken(string) (*entities.RefreshToken, error)
	SignTgDataCheckString(checkString string) string
	IsTelegramAuthTimeValid(timestamp int64) bool
	UserRole(ctx context.Context, userId int64) (string, error)
	DoesRoleMatches(userRole string, availableRoles []entities.UserRole) bool

	// Context related
	ContextUserIdValue(ctx context.Context) (int64, error)
	ContextUserRoleValue(ctx context.Context) (string, error)
}

func New(config *config.Config, logger *slog.Logger, db *pgxpool.Pool) Service {

	storage := postgres.New(db)

	return &authService{
		config:  config,
		storage: storage,
		logger:  logger,
		meta: meta{
			atSecret:          []byte(config.Auth.AccessTokenSecret),
			rtSecret:          []byte(config.Auth.RefreshTokenSecret),
			sessionTTL:        time.Duration(config.Auth.SessionTTL) * time.Minute,
			sessionRefreshTTL: time.Duration(config.Auth.SessionRefreshTTL) * time.Minute,
			telegramToken:     []byte(config.Telegram.Token),
			tgAuthFreshIn:     3 * time.Minute,
		},
	}
}

func (a *authService) DoesRoleMatches(userRole string, availableRoles []entities.UserRole) bool {
	for _, r := range availableRoles {
		if string(r) == userRole {
			return true
		}
	}
	return false
}
