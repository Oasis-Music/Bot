package dbnull

import (
	"database/sql"
)

func NewNullString(s *string) sql.NullString {

	var str string
	var isValid bool

	if s != nil {
		isValid = true
		str = *s
	}

	return sql.NullString{
		String: str,
		Valid:  isValid,
	}
}
