package soundtrack

import "context"

const DELETE_SOUNDTRACK_QUERY = "DELETE FROM soundtrack WHERE id = $1;"

func (s *soundtrackStorage) DeleteSoundtrack(ctx context.Context, id int32) (int64, error) {
	res, err := s.database.Exec(context.Background(), DELETE_SOUNDTRACK_QUERY, id)
	if err != nil {
		return 0, err
	}

	return res.RowsAffected(), err
}
