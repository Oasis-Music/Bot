package user

import "context"

const GET_USER_ROLE_QUERY = `
SELECT role_code FROM roles INNER JOIN users 
ON roles.role_code = users.role WHERE users.id = $1;
`

func (s *UserStorage) GetRole(ctx context.Context, id int64) (string, error) {
	row := s.database.QueryRow(context.Background(), GET_USER_ROLE_QUERY, id)
	var roleCode string
	err := row.Scan(&roleCode)

	return roleCode, err
}
