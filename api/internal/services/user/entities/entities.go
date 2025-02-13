package entities

import "time"

// ID as int64 because TG provide it as safe 64-bit integer for json num range
// INFO: https://core.telegram.org/bots/webapps#webappuser
type User struct {
	ID           int64     `json:"id"`
	FirstName    string    `json:"firstName"`
	LastName     *string   `json:"lastName"`
	TgUsername   *string   `json:"tgUsername"`
	LanguageCode *string   `json:"languageCode"`
	TgPhotoUrl   *string   `json:"photoUrl"`
	TgPremium    bool      `json:"tgPremium"`
	Role         UserRole  `json:"role"`
	OnlineAt     time.Time `json:"onlineAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	CreatedAt    time.Time `json:"createdAt"`
}

func (u *User) GetLastNameValue() string {
	if u.LastName == nil {
		return ""
	}

	return *u.LastName
}

func (u *User) GetTgUsernameValue() string {
	if u.TgUsername == nil {
		return ""
	}

	return *u.TgUsername
}

func (u *User) GetTgPhotoUrlValue() string {
	if u.TgPhotoUrl == nil {
		return ""
	}

	return *u.TgPhotoUrl
}

type UserRole string

const (
	RoleUser      UserRole = "user"
	RoleModerator UserRole = "moderator"
	RoleAdmin     UserRole = "admin"
)

type NewUser struct {
	Id           int64
	FirstName    string
	LastName     string
	Username     string
	LanguageCode string
	PhotoURL     string
	HasTgPremium bool
}

type NewUserResult struct {
	UserId    int64
	FirstName string
}

type UserSuccessAuth struct {
	AccessToken  string
	RefreshToken string
}

type TgWebAppUser struct {
	Id           int64  `json:"id"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Username     string `json:"username"`
	LanguageCode string `json:"language_code"`
	PhotoURL     string `json:"photo_url"`
	IsPremium    bool   `json:"is_premium"`
	// AllowsWriteToPM bool   `json:"allows_write_to_pm"`
}

type AddFavouriteResult struct {
	ProductID    int64
	ProductTitle string
}
