package composites

import (
	userStorage "oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/config"
	"oasis/backend/internal/useCase/user"

	// "oasis/backend/internal/domain/services/user"

	"github.com/jackc/pgx/v4/pgxpool"
)

type UserComposite struct {
	WARNSotage userStorage.UserStorage
	UseCase    user.UseCase
}

func NewUserComposite(db *pgxpool.Pool, config *config.AppConfig, authService auth.AuthService) UserComposite {
	storage := userStorage.NewUserStorage(db)
	useCase := user.New(storage, config, authService)
	return UserComposite{
		UseCase:    useCase,
		WARNSotage: storage,
	}
}
