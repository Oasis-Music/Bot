package db

import (
	dbnull "oasis/backend/internal/adapters/db/db-null"
	"time"
)

type SoundtrackDTO struct {
	ID         int32
	Title      string
	Author     string
	Duration   int16
	CoverImage dbnull.NullString
	AudioFile  string
	CreatorID  int64
	CreatedAt  time.Time
}

type UserDTO struct {
	ID           int64
	FirstName    string
	LastName     dbnull.NullString
	Username     dbnull.NullString
	LanguageCode dbnull.NullString
	VisitedAt    time.Time
	CreatedAt    time.Time
}

type AddTrackParams struct {
	TrackId int32
	UserId  int64
}

type DeleteTrackParams struct {
	TrackId int32
	UserId  int64
}

type NewSoundtrackParams struct {
	Title       string
	Author      string
	Duration    int16
	CoverImage  dbnull.NullString
	AudioFile   string
	IsValidated bool
	CreatorID   string
}

type CreateUserParams struct {
	ID           int64
	FirstName    string
	LastName     dbnull.NullString
	Username     dbnull.NullString
	LanguageCode dbnull.NullString
}

type CreateUserRow struct {
	ID        int64
	FirstName string
}
