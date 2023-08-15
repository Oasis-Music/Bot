package composites

import (
	"oasis/api/internal/auth"
	"oasis/api/internal/config"
	userStorage "oasis/api/internal/repo/storage/postgres/user"
	"oasis/api/internal/useCase/user"

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
