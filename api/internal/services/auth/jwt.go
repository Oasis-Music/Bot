package auth

import (
	"errors"
	"net/http"
	"oasis/api/internal/utils"
	"regexp"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func (a *authService) CreateJwtPair(userID int64, firstName string) (RawTokenPair, error) {

	userIdString := utils.Int64ToString(userID)

	r := RawTokenPair{
		AtExpiresAt: jwt.NewNumericDate(time.Now().Add(a.atExpIn)),
		RtID:        uuid.New().String(),
		RtExpiresAt: jwt.NewNumericDate(time.Now().Add(a.rtExpIn)),
	}

	refeshClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshToken{
		UserId:      userIdString,
		RefreshUuid: r.RtID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: r.RtExpiresAt,
			Issuer:    "0_o",
		},
	})

	refreshToken, err := refeshClaims.SignedString(a.rtSecret)
	if err != nil {
		a.logger.Error("failed to sign RT", "error", err)
		return r, ErrJwtInternal
	}

	accessClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, accessToken{
		UserID:    userIdString,
		FirstName: firstName,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: r.AtExpiresAt,
			Issuer:    "0_o",
		},
	})

	accessToken, err := accessClaims.SignedString(a.atSecret)
	if err != nil {
		a.logger.Error("failed to sign AT", "error", err)
		return r, ErrJwtInternal
	}

	r.AccessToken = accessToken
	r.RefreshToken = refreshToken

	return r, nil
}

func (a *authService) extractHeaderToken(r *http.Request) (string, error) {

	headerTokenRegexp := regexp.MustCompile(`Bearer\s([a-zA-Z0-9\.\-_]+)$`)

	var token string

	matches := headerTokenRegexp.FindStringSubmatch(r.Header.Get("Authorization"))
	if len(matches) >= 2 {
		token = matches[1]
	}

	if token == "" {
		return "", ErrBearerNotPresent
	}

	return token, nil
}

func (a *authService) ParseAccessToken(rawToken string) (*accessToken, error) {
	/*
		INFO: with custom claims: DON'T USE jwt.Parse() - it tries to cast float64 to int64 in the "exp" field.
	*/
	token, err := jwt.ParseWithClaims(rawToken, &accessToken{}, func(token *jwt.Token) (interface{}, error) {
		return a.atSecret, nil
	})
	if err != nil {
		a.logger.Error("parse AT", "error", err)
		return nil, err
	}

	claims, ok := token.Claims.(*accessToken)
	if !(ok && token.Valid) {
		return nil, ErrGetAccessData
	}

	return claims, nil
}

func (a *authService) ParseRefreshToken(rawToken string) (*refreshToken, error) {

	token, err := jwt.ParseWithClaims(rawToken, &refreshToken{}, func(token *jwt.Token) (interface{}, error) {
		return a.rtSecret, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			claims, ok := token.Claims.(*refreshToken)
			if !ok {
				return nil, ErrGetRefreshData
			}

			// IMPORTANT: we should return expired token (claims) for its revocation
			return claims, jwt.ErrTokenExpired
		}
		a.logger.Error("parse RT", "error", err)
		return nil, err
	}

	claims, ok := token.Claims.(*refreshToken)
	if !(ok && token.Valid) {
		return nil, ErrGetRefreshData
	}

	return claims, nil
}
