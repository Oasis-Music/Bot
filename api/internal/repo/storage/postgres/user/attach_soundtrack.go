package user

import (
	"context"
	"errors"
	"oasis/api/internal/entity"
	"oasis/api/internal/repo/storage/postgres"
	"oasis/api/internal/repo/storage/postgres/sqlc"

	"github.com/jackc/pgconn"
)

func (s *UserStorage) AttachSoundtrack(ctx context.Context, params entity.AttachSoundtrackToUserParams) error {

	var pgerr *pgconn.PgError

	err := s.sqlc.AttachSoundtrack(ctx, sqlc.AttachSoundtrackParams{
		UserID:       params.UserID,
		SoundtrackID: params.SoundtrackID,
	})

	if err != nil {
		if ok := errors.As(err, &pgerr); ok {
			switch pgerr.Code {
			case postgres.DuplicateKeyErrorCode:
				return postgres.DuplicateKeyError
			case postgres.KeyIsNotPresentErrorCode:
				return postgres.KeyIsNotPresentError
			default:
				return err
			}
		}
	}

	return nil
}
