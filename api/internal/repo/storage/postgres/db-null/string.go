package dbnull

import (
	"database/sql"
)

type NullString struct {
	sql.NullString
}

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

func (n NullString) ValueOrDefault() string {
	if !n.Valid {
		return ""
	}
	return n.String
}

func (n NullString) ValueOrNil() *string {
	if !n.Valid {
		return nil
	}
	return &n.String
}
