-- name: SaveRefreshToken :exec
INSERT INTO auth_token (refresh_token_id) VALUES ($1);

-- name: DeleteRefreshToken :execrows
DELETE FROM auth_token WHERE refresh_token_id = $1;