-- name: SaveRefreshToken :exec
INSERT INTO auth_token (id, expires_at) VALUES ($1, $2);

-- name: DeleteRefreshToken :execrows
DELETE FROM auth_token WHERE id = $1;
