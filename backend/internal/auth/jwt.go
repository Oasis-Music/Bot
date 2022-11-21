package auth

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

func (a *authService) CreateJwtPair(userID int64, firstName string) (RawTokenPair, error) {

	idString := strconv.FormatInt(userID, 10)

	r := RawTokenPair{
		AtExpiresAt: jwt.NewNumericDate(time.Now().Add(3 * time.Minute)),
		AtID:        uuid.New().String(),
		RtExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
	}

	r.RtID = r.AtID + "-" + idString

	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshToken{
		UserId:      idString,
		RefreshUuid: r.RtID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: r.RtExpiresAt,
			Issuer:    "0_o",
		},
	})

	refreshToken, err := rt.SignedString(a.refreshJwtSecret)
	if err != nil {
		// TODO: create error
		return r, err
	}

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, accessToken{
		UserID:     idString,
		FirstName:  firstName,
		AccessUuid: r.AtID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: r.AtExpiresAt,
			Issuer:    "0_o",
		},
	})

	accessToken, err := at.SignedString(a.jwtSecret)
	if err != nil {
		// TODO: create error
		return r, err
	}

	r.AccessToken = accessToken
	r.RefreshToken = refreshToken

	return r, nil
}
