package composites

import (
	"oasis/api/internal/config"
	trackStorage "oasis/api/internal/repo/storage/postgres/soundtrack"
	"oasis/api/internal/repo/storage/postgres/sqlc"
	"oasis/api/internal/useCase/soundtrack"

	"github.com/jackc/pgx/v4/pgxpool"
)

type SoundtrackComposite struct {
	UseCase soundtrack.UseCase
}

func NewSoundtrackComposite(config *config.AppConfig, db *pgxpool.Pool, sqlc *sqlc.Queries, userComposite UserComposite) SoundtrackComposite {
	storage := trackStorage.NewSoundtrackStorage(db, config, sqlc)
	useCase := soundtrack.New(storage, config, userComposite.UseCase)
	return SoundtrackComposite{
		UseCase: useCase,
	}
}
