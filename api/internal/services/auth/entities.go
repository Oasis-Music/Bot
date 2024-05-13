package auth

import "github.com/golang-jwt/jwt/v5"

type RawTokenPair struct {
	AtExpiresAt  *jwt.NumericDate
	RtID         string
	RtExpiresAt  *jwt.NumericDate
	AccessToken  string
	RefreshToken string
}

type accessToken struct {
	UserID    string `json:"userId"`
	FirstName string `json:"firstName"`
	jwt.RegisteredClaims
}

type refreshToken struct {
	UserId      string `json:"userId"`
	RefreshUuid string `json:"refreshUuid"`
	jwt.RegisteredClaims
}
