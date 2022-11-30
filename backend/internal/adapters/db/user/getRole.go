package user

import "context"

const GET_USER_ROLE_QUERY = `
SELECT role_name FROM roles INNER JOIN users 
ON roles.id = users.role WHERE users.id = $1;
`

func (s *userStorage) GetRole(ctx context.Context, id int64) (string, error) {
	row := s.database.QueryRow(context.Background(), GET_USER_ROLE_QUERY, id)
	var roleName string
	err := row.Scan(&roleName)

	return roleName, err
}
