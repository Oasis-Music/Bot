package dbnull

import "database/sql"

type NullString struct {
	sql.NullString
}

func NewNullString(s string, valid bool) NullString {
	return NullString{
		NullString: sql.NullString{
			String: s,
			Valid:  valid,
		},
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
