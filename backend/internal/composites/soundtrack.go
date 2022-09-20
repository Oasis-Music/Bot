package composites

import (
	trackStorage "oasis/backend/internal/adapters/db/soundtrack"
	"oasis/backend/internal/config"
	"oasis/backend/internal/domain/services/soundtrack"

	"github.com/jackc/pgx/v4/pgxpool"
)

type SoundtrackComposite struct {
	Service soundtrack.SoundtrackService
}

func NewSoundtrackComposite(db *pgxpool.Pool, config *config.AppConfig) SoundtrackComposite {
	storage := trackStorage.NewSoundtrackStorage(db)
	service := soundtrack.NewSoundtrackService(storage, config)
	return SoundtrackComposite{
		Service: service,
	}
}
