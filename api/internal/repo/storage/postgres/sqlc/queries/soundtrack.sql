-- name: GetSoundtrack :one
SELECT *, EXISTS
    (SELECT TRUE FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $2) AS attached
FROM soundtrack WHERE id = $1;

-- name: CreateSoundtrack :one
INSERT INTO soundtrack (
    title,
    author,
    duration,
    cover_image,
    audio_file,
    is_validated,
    creator_id
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
)
RETURNING id;

-- name: DeleteSoundtrack :execrows
DELETE FROM soundtrack WHERE id = $1;

-- name: GetSoundtrackByTitle :many
SELECT *,
	EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = id AND user_soundtrack.user_id = $2) as attached
FROM soundtrack
WHERE to_tsvector(title) @@ to_tsquery($1) LIMIT 10;


-- name: CheckSoundtrackHash :one
SELECT 
    s.*,
    EXISTS(SELECT True FROM user_soundtrack WHERE soundtrack_id = s.id AND user_soundtrack.user_id = $2) as attached
FROM soundtrack s 
INNER JOIN soundtrack_hash sh ON sh.hash = $1 AND s.id = sh.soundtrack_id;