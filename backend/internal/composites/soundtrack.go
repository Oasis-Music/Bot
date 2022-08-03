package composites

import (
	trackStorage "oasis/backend/internal/adapters/db"
	"oasis/backend/internal/domain/services/soundtrack"

	"github.com/jackc/pgx/v4/pgxpool"
)

type SoundtrackComposite struct {
	Service soundtrack.SoundtrackService
}

func NewSoundtrackComposite(db *pgxpool.Pool) SoundtrackComposite {
	storage := trackStorage.NewSoundtrackStorage(db)
	service := soundtrack.NewSoundtrackService(storage)
	return SoundtrackComposite{
		Service: service,
	}
}
