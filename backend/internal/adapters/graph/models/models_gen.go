// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

import (
	"fmt"
	"io"
	"strconv"

	"github.com/99designs/gqlgen/graphql"
)

type SoundtrackResult interface {
	IsSoundtrackResult()
}

type UserResult interface {
	IsUserResult()
}

type UserTracksResult interface {
	IsUserTracksResult()
}

type AddSoundtrackInput struct {
	Title      string          `json:"title"`
	Author     string          `json:"author"`
	CoverImage *graphql.Upload `json:"coverImage"`
	Audiofile  graphql.Upload  `json:"audiofile"`
}

type AddTrackToUserInput struct {
	UserID  string `json:"userId"`
	TrackID string `json:"trackId"`
}

type AuthorizationResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}

type DeleteTrackFromUserInput struct {
	UserID  string `json:"userId"`
	TrackID string `json:"trackId"`
}

type NotFound struct {
	Message string `json:"message"`
}

func (NotFound) IsSoundtrackResult() {}

func (NotFound) IsUserResult() {}

func (NotFound) IsUserTracksResult() {}

type Soundtrack struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Author    string  `json:"author"`
	Duration  int     `json:"duration"`
	CoverURL  *string `json:"coverURL"`
	AudioURL  string  `json:"audioURL"`
	Validated bool    `json:"validated"`
	CreatorID string  `json:"creatorId"`
	CreatedAt string  `json:"createdAt"`
}

func (Soundtrack) IsSoundtrackResult() {}

type SoundtracksFilter struct {
	Page int `json:"page"`
}

type SoundtracksResponse struct {
	Soundtracks []Soundtrack `json:"soundtracks"`
}

type User struct {
	ID           string  `json:"id"`
	FirstName    string  `json:"firstName"`
	LastName     *string `json:"lastName"`
	Username     *string `json:"username"`
	LanguageCode *string `json:"languageCode"`
	Role         string  `json:"role"`
	VisitedAt    string  `json:"visitedAt"`
	CreatedAt    string  `json:"createdAt"`
}

func (User) IsUserResult() {}

type UserTracksFilter struct {
	Page int `json:"page"`
}

type UserTracksResponse struct {
	Total       int          `json:"total"`
	Soundtracks []Soundtrack `json:"soundtracks"`
}

func (UserTracksResponse) IsUserTracksResult() {}

type Role string

const (
	RoleAdmin Role = "ADMIN"
	RoleUser  Role = "USER"
)

var AllRole = []Role{
	RoleAdmin,
	RoleUser,
}

func (e Role) IsValid() bool {
	switch e {
	case RoleAdmin, RoleUser:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
