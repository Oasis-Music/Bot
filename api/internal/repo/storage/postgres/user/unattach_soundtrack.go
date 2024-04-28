package user

import (
	"context"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres/sqlc"
)

func (s *UserStorage) UnattachSoundtrack(ctx context.Context, params entity.UnattachSoundtrackFromUserParams) (int64, error) {

	return s.sqlc.UnattachSoundtrack(ctx, sqlc.UnattachSoundtrackParams{
		UserID:       params.UserID,
		SoundtrackID: params.SoundtrackID,
	})
}
