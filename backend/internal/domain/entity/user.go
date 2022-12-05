package entity

import "time"

type User struct {
	ID           int64
	FirstName    string
	LastName     *string
	Username     *string
	LanguageCode *string
	Role         string
	VisitedAt    time.Time
	CreatedAt    time.Time
}

type UserAuthorization struct {
	AccessToken  string
	RefreshToken string
}

type UserTracksFilter struct {
	Page int
}

type UserTracks struct {
	Soundtracks []Soundtrack
}

// Is it a DTO?
type UserInitData struct {
	Id           int64  `json:"id"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Username     string `json:"username"`
	LanguageCode string `json:"language_code"`
}

type AddTrackToUserParams struct {
	UserID  int64
	TrackID int32
}

type DeleteTrackFromUserParams struct {
	UserID  int64
	TrackID int32
}
