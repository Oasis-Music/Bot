package user

import (
	"context"
	"time"
)

const UPDATE_USER_VISIT_DATE_QUERY = `
UPDATE users
	SET visited_at = $2
WHERE id = $1
`

func (s *userStorage) UpdateUserVisitDate(ctx context.Context, id int64) error {
	_, err := s.database.Exec(context.Background(), UPDATE_USER_VISIT_DATE_QUERY, id, time.Now())
	return err
}
