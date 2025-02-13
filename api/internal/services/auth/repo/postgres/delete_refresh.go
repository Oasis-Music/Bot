package postgres

import (
	"context"
	"errors"

	"github.com/google/uuid"
)

func (a *authStorage) DeleteRefreshToken(ctx context.Context, id string) error {

	parsedUUID, err := uuid.Parse(id)
	if err != nil {
		return errors.New("wrong refrsh token id")
	}

	affectedRows, err := a.sqlc.DeleteRefreshToken(ctx, parsedUUID)
	if err != nil {
		return err
	}

	if affectedRows == 0 {
		return ErrRefreshNotExists
	}

	return nil
}
