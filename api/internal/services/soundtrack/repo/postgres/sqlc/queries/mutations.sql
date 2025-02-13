-- name: CreateSoundtrack :one
INSERT INTO soundtrack (
    title,
    author,
    duration,
    cover_image,
    audio_file,
    creator_id
) VALUES (
    $1, $2, $3, $4, $5, $6
)
RETURNING id;

-- name: DeleteSoundtrack :execrows
DELETE FROM soundtrack WHERE id = $1;

-- name: SaveSoundtrackHash :exec
INSERT INTO soundtrack_hash (hash, soundtrack_id) VALUES ($1, $2);
