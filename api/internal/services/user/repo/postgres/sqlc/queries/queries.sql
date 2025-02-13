-- name: GetUser :one
SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    u.tg_username,
    u.language_code,
    u.tg_photo_url,
    u.tg_premium,
    ur.role_name,
    u.online_at,
    u.created_at,
    u.updated_at
FROM users u
INNER JOIN user_role ur ON u.role_id = ur.role_id WHERE u.user_id = $1;
