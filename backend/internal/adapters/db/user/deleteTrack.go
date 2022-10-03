package user

import (
	"context"
	"oasis/backend/internal/adapters/db"
)

const DELETE_TRACK_QUERY = `
DELETE FROM user_soundtrack WHERE user_id = $1 AND soundtrack_id = $2
`

func (s *userStorage) DeleteTrack(ctx context.Context, params db.DeleteTrackParams) (int64, error) {
	result, err := s.database.Exec(context.Background(), DELETE_TRACK_QUERY, params.UserId, params.TrackId)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected(), nil
}
