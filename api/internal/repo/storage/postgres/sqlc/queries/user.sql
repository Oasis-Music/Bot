-- name: AttachSoundtrack :exec
INSERT INTO user_soundtrack (user_id, soundtrack_id) VALUES ($1, $2);