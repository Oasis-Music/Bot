package user

import (
	"context"
	"fmt"
	"log"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/repo/storage/postgres"
	"strconv"
)

const (
	USERS_BY_IDs_QUERY = `
	SELECT id,
		first_name,
		last_name,
		username,
		language_code,
		role,
		visited_at,
		created_at
	FROM users
	WHERE id IN (`
)

func (s *UserStorage) GetUsers(ctx context.Context, ids []int64) ([]entity.User, error) {

	sql := getUsersQueryBuilder(USERS_BY_IDs_QUERY, ids)

	var queryParams []interface{}
	if len(ids) == 0 {
		return nil, fmt.Errorf("slice ids must have at least one element")
	}
	for _, v := range ids {
		queryParams = append(queryParams, v)
	}

	rows, err := s.database.Query(context.Background(), sql, queryParams...)
	if err != nil {
		log.Println("get-users query:", err)
		return nil, err
	}

	defer rows.Close()

	dbUsers := make([]postgres.UserDTO, 0, len(ids))

	for rows.Next() {
		var dto postgres.UserDTO
		if err := rows.Scan(
			&dto.ID,
			&dto.FirstName,
			&dto.LastName,
			&dto.Username,
			&dto.LanguageCode,
			&dto.Role,
			&dto.VisitedAt,
			&dto.CreatedAt,
		); err != nil {
			return nil, err
		}
		dbUsers = append(dbUsers, dto)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	users := make([]entity.User, 0, len(dbUsers))

	for _, user := range dbUsers {

		users = append(users, entity.User{
			ID:           user.ID,
			FirstName:    user.FirstName,
			LastName:     user.LastName.ValueOrNil(),
			Username:     user.Username.ValueOrNil(),
			LanguageCode: user.LanguageCode.ValueOrNil(),
			Role:         string(user.Role),
			VisitedAt:    user.VisitedAt,
			CreatedAt:    user.CreatedAt,
		})
	}

	return users, nil
}

func getUsersQueryBuilder(query string, ids []int64) string {

	idsLen := len(ids)

	for i := 1; i <= idsLen; i++ {
		if i == idsLen {
			query += "$" + strconv.Itoa(i)
			break
		}
		query += "$" + strconv.Itoa(i) + ", "
	}

	query += ")"

	return query
}
