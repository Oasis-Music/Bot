-- name: CreateUser :one
INSERT INTO users
	(
		id,
		first_name,
		last_name,
		username,
		language_code,
		user_role
	)
	VALUES
	(
		$1,
		$2,
		$3,
		$4,
		$5,
		$6
	)
RETURNING id, first_name;

-- name: GetUser :one
SELECT 
    id,
	first_name,
	last_name,
	username,
	language_code,
	user_role,
	visited_at,
	created_at
FROM users
WHERE id = $1;

-- name: GetUsersByID :many
SELECT 
	id,
	first_name,
	last_name,
	username,
	language_code,
	user_role,
	visited_at,
	created_at
FROM users
WHERE id = ANY($1::BIGINT[]);

-- name: UpdateUser :one
UPDATE users SET
	first_name = $2,
    last_name = $3,
    username = $4,
	language_code = $5,
	visited_at = $6
WHERE id = $1 RETURNING id, first_name;

-- name: GetUserRole :one
SELECT role_code FROM roles INNER JOIN users ON roles.role_code = users.user_role WHERE users.id = 1;

-- name: AttachSoundtrack :exec
INSERT INTO user_soundtrack (user_id, soundtrack_id) VALUES ($1, $2);

-- name: UnattachSoundtrack :execrows
DELETE FROM user_soundtrack WHERE user_id = $1 AND soundtrack_id = $2;

-- name: UpdateVisitDate :exec
UPDATE users SET visited_at = $2 WHERE id = $1;