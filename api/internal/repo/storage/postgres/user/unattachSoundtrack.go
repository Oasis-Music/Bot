package user

import (
	"context"
	"oasis/api/internal/entity"
)

const DELETE_TRACK_QUERY = `
DELETE FROM user_soundtrack WHERE user_id = $1 AND soundtrack_id = $2
`

func (s *UserStorage) UnattachSoundtrack(ctx context.Context, params entity.UnattachSoundtrackFromUserParams) (int64, error) {
	result, err := s.database.Exec(context.Background(), DELETE_TRACK_QUERY, params.UserID, params.TrackID)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected(), nil
}
