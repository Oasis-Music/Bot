package composites

import (
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	userStorage "oasis/backend/internal/repo/storage/postgres/user"
	"oasis/backend/internal/useCase/user"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserComposite struct {
	WARNSotage *userStorage.UserStorage
	UseCase    user.UseCase
}

func NewUserComposite(db *pgxpool.Pool, config *config.AppConfig, authService auth.AuthService) UserComposite {
	// storage := userStorage.NewUserStorage(db)
	storage := userStorage.NewUserStorage(db, config)
	useCase := user.New(storage, config, authService)
	return UserComposite{
		UseCase:    useCase,
		WARNSotage: storage,
	}
}
