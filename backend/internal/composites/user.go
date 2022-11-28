package composites

import (
	userStorage "oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	"oasis/backend/internal/domain/services/user"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserComposite struct {
	WARNSotage userStorage.UserStorage
	Service    user.UserService
}

func NewUserComposite(db *pgxpool.Pool, config *config.AppConfig, authService auth.AuthService) UserComposite {
	storage := userStorage.NewUserStorage(db)
	service := user.NewUserService(storage, config, authService)
	return UserComposite{
		Service:    service,
		WARNSotage: storage,
	}
}
