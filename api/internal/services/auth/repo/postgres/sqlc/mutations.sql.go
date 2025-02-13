// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0
// source: mutations.sql

package sqlc

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const deleteRefreshToken = `-- name: DeleteRefreshToken :execrows
DELETE FROM auth_token WHERE id = $1
`

func (q *Queries) DeleteRefreshToken(ctx context.Context, id uuid.UUID) (int64, error) {
	result, err := q.db.Exec(ctx, deleteRefreshToken, id)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected(), nil
}

const saveRefreshToken = `-- name: SaveRefreshToken :exec
INSERT INTO auth_token (id, expires_at) VALUES ($1, $2)
`

type SaveRefreshTokenParams struct {
	ID        uuid.UUID
	ExpiresAt time.Time
}

func (q *Queries) SaveRefreshToken(ctx context.Context, arg SaveRefreshTokenParams) error {
	_, err := q.db.Exec(ctx, saveRefreshToken, arg.ID, arg.ExpiresAt)
	return err
}
