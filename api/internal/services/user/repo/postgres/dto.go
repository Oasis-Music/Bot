package postgres

import (
	"database/sql"
	"oasis/api/internal/services/user/entities"
	"oasis/api/pkg/postgres"
	"time"
)

type UserDTO struct {
	UserID       int64
	FirstName    string
	LastName     sql.NullString
	TgUsername   sql.NullString
	LanguageCode sql.NullString
	TgPhotoUrl   sql.NullString
	TgPremium    bool
	RoleName     string
	OnlineAt     time.Time
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func buildUser(u UserDTO) entities.User {
	return entities.User{
		ID:           u.UserID,
		FirstName:    u.FirstName,
		LastName:     postgres.ParseNullStringPtr(u.LastName),
		TgUsername:   postgres.ParseNullStringPtr(u.TgUsername),
		LanguageCode: postgres.ParseNullStringPtr(u.LanguageCode),
		TgPhotoUrl:   postgres.ParseNullStringPtr(u.TgPhotoUrl),
		TgPremium:    u.TgPremium,
		Role:         entities.UserRole(u.RoleName),
		OnlineAt:     u.OnlineAt,
		UpdatedAt:    u.UpdatedAt,
		CreatedAt:    u.CreatedAt,
	}
}
