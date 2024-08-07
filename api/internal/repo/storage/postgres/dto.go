package postgres

import (
	"database/sql"
	"fmt"
	"time"
)

type RoleType string

const (
	AdminRole RoleType = "admin"
	UserRole  RoleType = "user"
)

func (r *RoleType) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*r = RoleType(s)
	case string:
		*r = RoleType(s)
	default:
		return fmt.Errorf("unsupported type for RoleType: %T", src)
	}
	return nil
}

type SoundtrackDTO struct {
	ID          int32
	Title       string
	Author      string
	Duration    int16
	CoverImage  sql.NullString
	AudioFile   string
	IsValidated bool
	CreatorID   int64
	CreatedAt   time.Time
	Attached    bool // info: generic field
}

type UserDTO struct {
	ID           int64
	FirstName    string
	LastName     sql.NullString
	Username     sql.NullString
	LanguageCode sql.NullString
	UserRole     string
	VisitedAt    time.Time
	CreatedAt    time.Time
}
