package postgres

import (
	"context"
	"errors"
	"fmt"
	"oasis/api/internal/services/user/entities"
	"oasis/api/pkg/postgres"

	"github.com/jackc/pgx/v4"
)

func (s *storage) User(ctx context.Context, id int64) (*entities.User, error) {

	data, err := s.sqlc.GetUser(ctx, id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, fmt.Errorf("storage: %w", postgres.ErrNoData)
		}

		s.logger.Error("db: get user", "error", err)
		return nil, err
	}

	user := buildUser(UserDTO(data))

	return &user, nil
}
