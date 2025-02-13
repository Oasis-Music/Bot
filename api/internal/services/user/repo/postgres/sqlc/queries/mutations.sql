-- name: CreateUser :one
INSERT INTO users (
  user_id,
  first_name,
  last_name,
  tg_username,
  language_code,
  tg_photo_url,
  tg_premium,
  role_id
) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id, first_name;
