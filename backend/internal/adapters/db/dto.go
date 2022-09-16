package db

import (
	"database/sql"
	"time"
)

type SoundtrackDTO struct {
	ID         int32
	Title      string
	Author     string
	Duration   int16
	CoverImage sql.NullString
	FileURL    string
	CreatorID  string
	CreatedAt  time.Time
}
