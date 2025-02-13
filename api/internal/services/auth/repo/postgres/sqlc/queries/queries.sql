-- name: GetUserRole :one
SELECT ur.role_name FROM users u INNER JOIN user_role ur ON u.role_id = ur.role_id WHERE u.user_id = $1;
