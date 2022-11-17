package db

import (
	"database/sql"
	dbnull "oasis/backend/internal/adapters/db/db-null"
	"time"
)

type SoundtrackDTO struct {
	ID         int32
	Title      string
	Author     string
	Duration   int16
	CoverImage sql.NullString
	AudioFile  string
	CreatorID  string
	CreatedAt  time.Time
}

type UserDTO struct {
	ID           int32
	TelegramID   int64
	FirstName    string
	LastName     dbnull.NullString
	Username     dbnull.NullString
	LanguageCode dbnull.NullString
	VisitedAt    time.Time
	CreatedAt    time.Time
}

type AddTrackParams struct {
	TrackId int32
	UserId  int32
}

type DeleteTrackParams struct {
	TrackId int32
	UserId  int32
}

type NewSoundtrackParams struct {
	Title       string
	Author      string
	Duration    int16
	CoverImage  sql.NullString
	AudioFile   string
	IsValidated bool
	CreatorID   string
}
