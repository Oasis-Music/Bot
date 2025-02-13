package auth

import (
	"errors"
	"oasis/api/internal/services/auth/entities"
	"oasis/api/internal/utils"

	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func (a *authService) CreateJwtPair(payload entities.JwtPairPayload) (entities.TokenPair, error) {

	pair := entities.TokenPair{
		AtExpiresAt: jwt.NewNumericDate(time.Now().Add(a.meta.sessionTTL)),
		RtID:        uuid.New(),
		RtExpiresAt: jwt.NewNumericDate(time.Now().Add(a.meta.sessionRefreshTTL)),
	}

	refeshClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, entities.RefreshToken{
		UserId:    utils.IntToString(payload.UserID),
		RefreshId: pair.RtID.String(),
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: pair.RtExpiresAt,
			Issuer:    "0_o",
		},
	})

	refreshToken, err := refeshClaims.SignedString(a.meta.rtSecret)
	if err != nil {
		a.logger.Error("failed to sign RT", "error", err)
		return pair, ErrJwtInternal
	}

	accessClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, entities.AccessToken{
		UserID:    utils.IntToString(payload.UserID),
		FirstName: payload.FirstName,
		Role:      payload.UserRole,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: pair.AtExpiresAt,
			Issuer:    "0_o",
		},
	})

	accessToken, err := accessClaims.SignedString(a.meta.atSecret)
	if err != nil {
		a.logger.Error("failed to sign AT", "error", err)
		return pair, ErrJwtInternal
	}

	pair.AccessToken = accessToken
	pair.RefreshToken = refreshToken

	return pair, nil
}

func (a *authService) ParseAccessToken(rawToken string) (*entities.AccessToken, error) {
	/*
		INFO: with custom claims: DON'T USE jwt.Parse() - it tries to cast float64 to int64 in the "exp" field.
	*/
	token, err := jwt.ParseWithClaims(rawToken, &entities.AccessToken{}, func(token *jwt.Token) (interface{}, error) {
		return a.meta.atSecret, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*entities.AccessToken)
	if !(ok && token.Valid) {
		return nil, ErrGetAccessData
	}

	return claims, nil
}

func (a *authService) ParseRefreshToken(rawToken string) (*entities.RefreshToken, error) {

	token, err := jwt.ParseWithClaims(rawToken, &entities.RefreshToken{}, func(token *jwt.Token) (interface{}, error) {
		return a.meta.rtSecret, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			claims, ok := token.Claims.(*entities.RefreshToken)
			if !ok {
				return nil, ErrGetRefreshData
			}

			// IMPORTANT: we should return expired token (claims) for its revocation
			return claims, jwt.ErrTokenExpired
		}
		a.logger.Error("parse RT", "error", err)
		return nil, err
	}

	claims, ok := token.Claims.(*entities.RefreshToken)
	if !(ok && token.Valid) {
		return nil, ErrGetRefreshData
	}

	return claims, nil
}
