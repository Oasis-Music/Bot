package user

import (
	"context"
	"errors"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"

	"github.com/jackc/pgconn"
)

const ADD_TRACK_QUERY = `
INSERT INTO user_soundtrack (user_id, soundtrack_id) VALUES ($1, $2);
`

func (s *UserStorage) AttachSoundtrack(ctx context.Context, params entity.AttachSoundtrackToUserParams) error {

	var pgerr *pgconn.PgError

	_, err := s.database.Exec(context.Background(), ADD_TRACK_QUERY,
		params.UserID,
		params.TrackID,
	)

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
