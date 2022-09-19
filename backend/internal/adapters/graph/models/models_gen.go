// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

type SoundtrackResult interface {
	IsSoundtrackResult()
}

type UserResult interface {
	IsUserResult()
}

type UserTracksResult interface {
	IsUserTracksResult()
}

type AddTrackToUserInput struct {
	TrackID string `json:"trackId"`
	UserID  string `json:"userId"`
}

type NotFound struct {
	Message string `json:"message"`
}

func (NotFound) IsSoundtrackResult() {}
func (NotFound) IsUserResult()       {}
func (NotFound) IsUserTracksResult() {}

type Soundtrack struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	Author     string `json:"author"`
	Duration   int    `json:"duration"`
	CoverImage string `json:"coverImage"`
	FileURL    string `json:"fileURL"`
	CreatorID  string `json:"creatorId"`
	CreatedAt  string `json:"createdAt"`
}

func (Soundtrack) IsSoundtrackResult() {}

type SoundtracksFilter struct {
	Page int `json:"page"`
}

type SoundtracksResponse struct {
	Soundtracks []Soundtrack `json:"soundtracks"`
}

type User struct {
	ID         string `json:"id"`
	TelegramID string `json:"telegramId"`
	CreatedAt  string `json:"createdAt"`
}

func (User) IsUserResult() {}

type UserTracksFilter struct {
	Page int `json:"page"`
}

type UserTracksResponse struct {
	Soundtracks []Soundtrack `json:"soundtracks"`
}

func (UserTracksResponse) IsUserTracksResult() {}
