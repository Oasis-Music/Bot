-- name: AttachSoundtrack :exec
INSERT INTO user_soundtrack (user_id, soundtrack_id) VALUES ($1, $2);

-- name: UnattachSoundtrack :execrows
DELETE FROM user_soundtrack WHERE user_id = $1 AND soundtrack_id = $2;