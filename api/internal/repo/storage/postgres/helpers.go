package postgres

import "database/sql"

func NewNullInt32(n int32) sql.NullInt32 {
	return sql.NullInt32{
		Int32: n,
		Valid: true,
	}
}

func NewNullString(s string) sql.NullString {

	var src sql.NullString

	if s == "" {
		return src
	}

	src.Valid = true
	src.String = s

	return src
}

func NewNullPtrString(s *string) sql.NullString {

	var str string
	var valid bool

	if s != nil {
		valid = true
		str = *s
	}

	return sql.NullString{
		String: str,
		Valid:  valid,
	}
}
