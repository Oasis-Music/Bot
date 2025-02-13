// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

import (
	"fmt"
	"io"
	"strconv"

	"github.com/99designs/gqlgen/graphql"
)

type SoundtrackPayload interface {
	IsSoundtrackPayload()
}

type SoundtrackResult interface {
	IsSoundtrackResult()
}

type UserResult interface {
	IsUserResult()
}

type UserSoundtracksResult interface {
	IsUserSoundtracksResult()
}

type AttachSoundtrackInput struct {
	UserID  string `json:"userId"`
	TrackID string `json:"trackId"`
}

type AuthorizationResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
}

type CreateSoundtrackInput struct {
	Title      string          `json:"title"`
	Author     string          `json:"author"`
	CoverImage *graphql.Upload `json:"coverImage,omitempty"`
	Audiofile  graphql.Upload  `json:"audiofile"`
	Attach     bool            `json:"attach"`
}

type Mutation struct {
}

type NotFound struct {
	Message string `json:"message"`
}

func (NotFound) IsSoundtrackResult() {}

func (NotFound) IsSoundtrackPayload() {}

func (NotFound) IsUserResult() {}

func (NotFound) IsUserSoundtracksResult() {}

type Query struct {
}

type Soundtrack struct {
	ID        string  `json:"id"`
	Title     string  `json:"title"`
	Author    string  `json:"author"`
	Duration  int     `json:"duration"`
	CoverURL  *string `json:"coverURL,omitempty"`
	AudioURL  string  `json:"audioURL"`
	Validated bool    `json:"validated"`
	CreatorID string  `json:"creatorId"`
	Creator   *User   `json:"creator"`
	CreatedAt string  `json:"createdAt"`
	Attached  bool    `json:"attached"`
}

func (Soundtrack) IsSoundtrackResult() {}

func (Soundtrack) IsSoundtrackPayload() {}

type SoundtracksFilter struct {
	Page int `json:"page"`
}

type SoundtracksResponse struct {
	Soundtracks []Soundtrack `json:"soundtracks"`
}

type UnattachSoundtrackInput struct {
	UserID  string `json:"userId"`
	TrackID string `json:"trackId"`
}

type User struct {
	ID           string  `json:"id"`
	FirstName    string  `json:"firstName"`
	LastName     *string `json:"lastName,omitempty"`
	Username     *string `json:"username,omitempty"`
	LanguageCode *string `json:"languageCode,omitempty"`
	Role         string  `json:"role"`
	VisitedAt    string  `json:"visitedAt"`
	CreatedAt    string  `json:"createdAt"`
}

func (User) IsUserResult() {}

type UserSoundtracksFilter struct {
	Page int `json:"page"`
}

type UserSoundtracksResponse struct {
	Total       int          `json:"total"`
	Soundtracks []Soundtrack `json:"soundtracks"`
}

func (UserSoundtracksResponse) IsUserSoundtracksResult() {}

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
