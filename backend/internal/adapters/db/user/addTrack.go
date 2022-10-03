package user

import (
	"context"
	"errors"
	"oasis/backend/internal/adapters/db"

	"github.com/jackc/pgconn"
)

const ADD_TRACK_QUERY = `
INSERT INTO user_soundtrack (user_id, soundtrack_id) VALUES ($1, $2);
`

func (s *userStorage) AddTrack(ctx context.Context, arg db.AddTrackParams) error {

	var pgerr *pgconn.PgError

	_, err := s.database.Exec(context.Background(), ADD_TRACK_QUERY,
		arg.UserId,
		arg.TrackId,
	)

	if err != nil {
		if ok := errors.As(err, &pgerr); ok {
			switch pgerr.Code {
			case db.DuplicateKeyErrorCode:
				return db.DuplicateKeyError
			case db.KeyIsNotPresentErrorCode:
				return db.KeyIsNotPresentError
			default:
				return err
			}
		}
	}

	return nil
}
