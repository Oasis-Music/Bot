// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package sqlc

import (
	"database/sql"
	"time"
)

type AuthToken struct {
	ID             sql.NullInt64
	RefreshTokenID string
	CreatedAt      time.Time
}

type Soundtrack struct {
	ID          int32
	Title       string
	Author      string
	Duration    int16
	CoverImage  sql.NullString
	AudioFile   string
	IsValidated bool
	CreatorID   int64
	CreatedAt   time.Time
}

type UserSoundtrack struct {
	UserID       int64
	SoundtrackID int32
	CreatedAt    time.Time
}
