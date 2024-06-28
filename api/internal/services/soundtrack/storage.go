package soundtrack

import (
	"context"
	"io"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/s3"
)

type SoundtrackStorage interface {
	Soundtrack(ctx context.Context, id int32, userID int64) (*entity.Soundtrack, error)
	AllSoundtracks(ctx context.Context, filter entity.SoundtrackFilter) ([]entity.Soundtrack, error)
	Create(ctx context.Context, params entity.NewSoundtrack) (int32, error)
	Delete(ctx context.Context, id int32) (bool, error)
	Search(ctx context.Context, value string, userID int64) ([]entity.Soundtrack, error)
}

type S3store interface {
	PutObject(ctx context.Context, prefix s3.ObjectPrefix, data io.Reader) (string, error)
	Test()
}
