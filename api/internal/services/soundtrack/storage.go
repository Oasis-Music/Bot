package soundtrack

import (
	"context"
	"io"
	"oasis/api/internal/entity"
)

type SoundtrackStorage interface {
	Soundtrack(ctx context.Context, id int32, userID int64) (*entity.Soundtrack, error)
	AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) ([]entity.Soundtrack, error)
	Create(ctx context.Context, params entity.NewSoundtrack) (int32, error)
	Delete(ctx context.Context, id int32) (bool, error)
	Search(ctx context.Context, value string, userID int64) ([]entity.Soundtrack, error)
	CheckSoundtrackHash(ctx context.Context, userID int64, hash string) (*entity.Soundtrack, error)
}

type S3store interface {
	PutAudio(ctx context.Context, data io.Reader) (string, error)
	PutCover(ctx context.Context, data io.Reader) (string, error)
	DeleteObject(ctx context.Context, key string) (bool, error)
	Test()
}
