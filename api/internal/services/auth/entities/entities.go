package entities

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type TokenPair struct {
	RtID         uuid.UUID
	AccessToken  string
	RefreshToken string
	AtExpiresAt  *jwt.NumericDate
	RtExpiresAt  *jwt.NumericDate
}

type JwtPairPayload struct {
	UserID    int64
	FirstName string
	UserRole  string
}

type AccessToken struct {
	Role      string `json:"role"`
	UserID    string `json:"userId"`
	FirstName string `json:"firstName"`
	jwt.RegisteredClaims
}

type RefreshToken struct {
	UserId    string `json:"userId"`
	RefreshId string `json:"refreshId"`
	jwt.RegisteredClaims
}

type UserRole string

const (
	RoleUser      UserRole = "user"
	RoleModerator UserRole = "moderator"
	RoleAdmin     UserRole = "admin"
)
