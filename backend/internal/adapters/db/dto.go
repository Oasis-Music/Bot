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
	// FileURL    string
	AudioFile string
	CreatorID string
	CreatedAt time.Time
}

type UserDTO struct {
	ID        int32
	TgID      string
	CreatedAt time.Time
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
	FileURL     string
	IsValidated bool
	CreatorID   string
}
