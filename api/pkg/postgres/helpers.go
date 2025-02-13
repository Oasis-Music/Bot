package postgres

import (
	"database/sql"
	"fmt"

	"github.com/jackc/pgtype"
)

// ----------------------------- NUMERIC -----------------------------

func ParseNumeric(src pgtype.Numeric) float64 {
	var dst float64
	if err := src.AssignTo(&dst); err != nil {
		fmt.Println(err)
		panic("wrong pgtype.Numeric value")
	}
	return dst
}

func NewNumeric(src float64) pgtype.Numeric {
	var dst pgtype.Numeric
	if err := dst.Set(src); err != nil {
		fmt.Println(err)
		panic("failed to set pgtype.Numeric value")
	}
	return dst
}

// ----------------------------- STRING -----------------------------

func ParseNullStringValue(src sql.NullString) string {
	if src.Valid {
		return src.String
	}
	return ""
}

func ParseNullStringPtr(s sql.NullString) *string {
	if !s.Valid {
		return nil
	}

	return &s.String
}

func NewNullString(src string) sql.NullString {
	var dst sql.NullString

	if src == "" {
		return dst
	}

	dst.Valid = true
	dst.String = src

	return dst
}
