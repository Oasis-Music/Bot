package composites

import (
	trackStorage "oasis/backend/internal/adapters/db/soundtrack"
	"oasis/backend/internal/config"
	"oasis/backend/internal/useCase/soundtrack"

	"github.com/jackc/pgx/v4/pgxpool"
)

type SoundtrackComposite struct {
	UseCase soundtrack.UseCase
}

func NewSoundtrackComposite(db *pgxpool.Pool, config *config.AppConfig) SoundtrackComposite {
	storage := trackStorage.NewSoundtrackStorage(db)
	useCase := soundtrack.New(storage, config)
	return SoundtrackComposite{
		UseCase: useCase,
	}
}
