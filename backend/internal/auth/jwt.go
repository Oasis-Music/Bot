package auth

import (
	"errors"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

var ErrJwtInternal = errors.New("failed to authorize")

func (a *authService) CreateJwtPair(userID int64, firstName string) (RawTokenPair, error) {

	idString := strconv.FormatInt(userID, 10)

	r := RawTokenPair{
		AtExpiresAt: jwt.NewNumericDate(time.Now().Add(3 * time.Minute)),
		AtID:        uuid.New().String(),
		RtExpiresAt: jwt.NewNumericDate(time.Now().Add(3 * time.Minute)),
		// TODO:
		// RtExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
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

	refreshToken, err := rt.SignedString(a.refreshTokenSecret)
	if err != nil {
		fmt.Println("RT: ", err)
		return r, ErrJwtInternal
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

	accessToken, err := at.SignedString(a.accessTokenSecret)
	if err != nil {
		fmt.Println("AT: ", err)
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
		return "", errors.New("token doesn't exist")
	}

	return token, nil
}

func (a *authService) ParseAccessToken(rawToken string) (*accessToken, error) {
	/*
		INFO: with custom claims: DON'T USE jwt.Parse() - it tries to cast float64 to int64 in the "exp" field.
	*/
	token, err := jwt.ParseWithClaims(rawToken, &accessToken{}, func(token *jwt.Token) (interface{}, error) {
		return a.accessTokenSecret, nil
	})

	if err != nil {
		fmt.Println(">>>", err)
		return nil, err
	}

	claims, ok := token.Claims.(*accessToken)
	if !(ok && token.Valid) {
		return nil, errors.New("fail to get data from token")
	}

	return claims, nil
}

func (a *authService) ParseRefreshToken(rawToken string) (*refreshToken, error) {
	token, err := jwt.ParseWithClaims(rawToken, &refreshToken{}, func(token *jwt.Token) (interface{}, error) {
		return a.refreshTokenSecret, nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*refreshToken)
	if !(ok && token.Valid) {
		return nil, errors.New("fail to get data from token")
	}

	return claims, nil
}
