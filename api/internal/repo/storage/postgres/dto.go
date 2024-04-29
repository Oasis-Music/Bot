package postgres

import (
	"database/sql"
	"fmt"
	dbnull "oasis/api/internal/repo/storage/postgres/db-null"
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

type UserDTO struct {
	ID           int64
	FirstName    string
	LastName     dbnull.NullString
	Username     dbnull.NullString
	LanguageCode dbnull.NullString
	Role         RoleType
	VisitedAt    time.Time
	CreatedAt    time.Time
}

type CreateUserParams struct {
	ID           int64
	FirstName    string
	LastName     dbnull.NullString
	Username     dbnull.NullString
	LanguageCode dbnull.NullString
	Role         RoleType
}

type UpdateUserParams struct {
	ID           int64
	FirstName    string
	LastName     dbnull.NullString
	Username     dbnull.NullString
	LanguageCode dbnull.NullString
	VisitedAt    time.Time
}

// ##############################################

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
	Attached    bool // generic field
}
