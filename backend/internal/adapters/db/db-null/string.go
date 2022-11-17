package dbnull

import "database/sql"

type NullString struct {
	sql.NullString
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
