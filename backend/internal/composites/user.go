package composites

import (
	userStorage "oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/config"
	"oasis/backend/internal/domain/services/user"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserComposite struct {
	Service user.UserService
}

func NewUserComposite(db *pgxpool.Pool, config *config.AppConfig) UserComposite {
	storage := userStorage.NewUserStorage(db)
	service := user.NewUserService(storage, config)
	return UserComposite{
		Service: service,
	}
}
