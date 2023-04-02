package composites

import (
	"oasis/backend/internal/config"
	trackStorage "oasis/backend/internal/repo/storage/postgres/soundtrack"
	"oasis/backend/internal/useCase/soundtrack"

	"github.com/jackc/pgx/v4/pgxpool"
)

type SoundtrackComposite struct {
	UseCase soundtrack.UseCase
}

func NewSoundtrackComposite(db *pgxpool.Pool, config *config.AppConfig) SoundtrackComposite {
	storage := trackStorage.NewSoundtrackStorage(db, config)
	useCase := soundtrack.New(storage, config)
	return SoundtrackComposite{
		UseCase: useCase,
	}
}
