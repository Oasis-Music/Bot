// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

import (
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
	Title      string         `json:"title"`
	Author     string         `json:"author"`
	CoverImage graphql.Upload `json:"coverImage"`
	Audiofile  graphql.Upload `json:"audiofile"`
}

type AddTrackToUserInput struct {
	UserID  string `json:"userId"`
	TrackID string `json:"trackId"`
}

type AuthorizationResponse struct {
	Token string `json:"token"`
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
	ID        string `json:"id"`
	Title     string `json:"title"`
	Author    string `json:"author"`
	Duration  int    `json:"duration"`
	CoverURL  string `json:"coverURL"`
	AudioURL  string `json:"audioURL"`
	Validated bool   `json:"validated"`
	CreatorID string `json:"creatorId"`
	CreatedAt string `json:"createdAt"`
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
	TelegramID   string  `json:"telegramId"`
	FirstName    string  `json:"firstName"`
	LastName     *string `json:"lastName"`
	Username     *string `json:"username"`
	LanguageCode *string `json:"languageCode"`
	VisitedAt    string  `json:"visitedAt"`
	CreatedAt    string  `json:"createdAt"`
}

func (User) IsUserResult() {}

type UserTracksFilter struct {
	Page int `json:"page"`
}

type UserTracksResponse struct {
	Soundtracks []Soundtrack `json:"soundtracks"`
}

func (UserTracksResponse) IsUserTracksResult() {}
