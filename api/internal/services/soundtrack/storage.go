package soundtrack

import (
	"context"
	"io"
	"oasis/api/internal/entity"
	"oasis/api/internal/services/soundtrack/entities"
)

type SoundtrackStorage interface {
	Create(ctx context.Context, track entity.NewSoundtrack, hash string) (int32, error)
	Delete(ctx context.Context, id int32) (bool, error)
	Search(ctx context.Context, value string, userID int64) ([]entity.Soundtrack, error)
	CheckHash(ctx context.Context, userID int64, hash string) (*entity.Soundtrack, error)
}

type SoundtrackModuleStorage interface {
	Soundtrack(ctx context.Context, soundtrackID int64, userID int64) (*entities.Soundtrack, error)
	Soundtracks(ctx context.Context, limit int64, after int64, before int64, filter entities.SoundtrackFilter, userID int64) (*entities.SoundtrackConnection, error)
}

type S3store interface {
	PutAudio(ctx context.Context, data io.Reader) (string, error)
	PutCover(ctx context.Context, data io.Reader) (string, error)
	DeleteObject(ctx context.Context, key string) (bool, error)
	Test()
}
