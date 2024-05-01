package entity

import "time"

type User struct {
	ID           int64 // telegram user's ID
	FirstName    string
	LastName     *string
	Username     *string
	LanguageCode *string
	Role         string
	VisitedAt    time.Time
	CreatedAt    time.Time
}

func (u *User) GetLastNameValue() string {
	if u.LastName == nil {
		return ""
	}

	return *u.LastName
}

func (u *User) GetUsernameValue() string {
	if u.Username == nil {
		return ""
	}

	return *u.Username
}

func (u *User) GetLanguageCodeValue() string {
	if u.LanguageCode == nil {
		return ""
	}

	return *u.LanguageCode
}

type NewUser struct {
	ID           int64
	FirstName    string
	LastName     *string
	Username     *string
	LanguageCode *string
	Role         string
}

type NewUserResult struct {
	ID        int64
	FirstName string
}

type UserAuthorization struct {
	AccessToken  string
	RefreshToken string
}

type UserTracksOptions struct {
	Page int
}

type UserUpdate struct {
	ID           int64
	FirstName    string
	LastName     *string
	Username     *string
	LanguageCode *string
	VisitedAt    time.Time
}

type UserUpdateResult struct {
	ID        int64
	FirstName string
}

type UserTracks struct {
	Total       int64
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

type AttachSoundtrackToUserParams struct {
	UserID       int64
	SoundtrackID int32
}

type UnattachSoundtrackFromUserParams struct {
	UserID       int64
	SoundtrackID int32
}
