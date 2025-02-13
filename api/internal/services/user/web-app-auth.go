package user

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"oasis/api/internal/services/user/entities"
	"oasis/api/internal/utils"
	"sort"
	"strings"
)

func (u *userService) WebAppAuth(ctx context.Context, initData string) (*entities.UserSuccessAuth, error) {

	if initData == "" {
		return nil, errors.New("empty web app initData")
	}

	dataMap, err := url.ParseQuery(initData)
	if err != nil {
		return nil, errors.New("invalid initData encoding")
	}

	// fmt.Printf("%+v\n", dataMap)

	var initDataHash string
	var authTimestamp int64

	pairs := make([]string, 0, len(dataMap))
	for k, v := range dataMap {
		if k == "hash" {
			initDataHash = v[0]
			continue
		}
		if k == "auth_date" {
			if num, err := utils.ParseInt64(v[0]); err == nil {
				authTimestamp = num
			}
		}

		pairs = append(pairs, k+"="+v[0])
	}

	/*
		Data-check-string is a chain of all received fields, sorted alphabetically
		in the format key=<value> with a line feed character ('\n', 0x0A) used as separator
		e.g., 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>'.

		link: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
	*/

	sort.Strings(pairs)

	if initDataHash == "" {
		return nil, errors.New("validity hash is empty")
	}

	if !u.config.IsDev {

		authFresh := u.authService.IsTelegramAuthTimeValid(authTimestamp)
		if !authFresh {
			return nil, errors.New("auth time expired")
		}

	}

	// Once validated, complex data types are represented as JSON-serialized objects
	if u.authService.SignTgDataCheckString(strings.Join(pairs, "\n")) != initDataHash {
		return nil, errors.New("user hash corrupted")
	}

	var tgUser entities.TgWebAppUser

	if err = json.Unmarshal([]byte(dataMap.Get("user")), &tgUser); err != nil {
		return nil, errors.New("invalid initData.user json")
	}

	// fmt.Printf("%+v\n", tgUser)

	user, err := u.User(ctx, tgUser.Id)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {

			u.logger.Info("create new user", "user_id", tgUser.Id)

			newUser, err := u.storageV2.CreateUser(ctx, entities.NewUser{
				Id:           tgUser.Id,
				FirstName:    tgUser.FirstName,
				LastName:     tgUser.LastName,
				Username:     tgUser.Username,
				LanguageCode: tgUser.LanguageCode,
				PhotoURL:     tgUser.PhotoURL,
				HasTgPremium: tgUser.IsPremium,
			})
			if err != nil {
				u.logger.Error("db: create user", "error", err)
				return nil, errors.New("failed to create new user")
			}

			u.logger.Info("new user created", "user_id", newUser.UserId)

			at, rt, err := u.getAuthTokenPair(ctx, newUser.UserId, newUser.FirstName, entities.RoleUser)
			if err != nil {
				// todo: handle error
				return nil, err
			}

			return &entities.UserSuccessAuth{
				AccessToken:  at,
				RefreshToken: rt,
			}, nil

		}

		return nil, errors.New("failed to get user")
	}

	// check user data update

	isChanged := checkTelegramDataDifference(tgUser, *user)

	fmt.Println("is user changed:", isChanged)

	at, rt, err := u.getAuthTokenPair(ctx, user.ID, user.FirstName, user.Role)
	if err != nil {
		// todo: handle error
		return nil, err
	}

	u.logger.Info("user authorized", "user_id", user.ID)

	return &entities.UserSuccessAuth{
		AccessToken:  at,
		RefreshToken: rt,
	}, nil

}

func (u *userService) getAuthTokenPair(ctx context.Context, userId int64, firstName string, userRole entities.UserRole) (string, string, error) {

	rawTokenPair, err := u.authService.CreateJwtPair(entities.JwtPairPayload{
		UserID:    userId,
		FirstName: firstName,
		UserRole:  string(userRole),
	})
	if err != nil {
		return "", "", err
	}

	err = u.authService.SaveRefreshToken(ctx, rawTokenPair)
	if err != nil {
		return "", "", err
	}

	return rawTokenPair.AccessToken, rawTokenPair.RefreshToken, nil
}

func checkTelegramDataDifference(tgUser entities.TgWebAppUser, user entities.User) bool {

	var canged bool

	what := make([]string, 0)

	if tgUser.FirstName != user.FirstName {
		canged = true
		what = append(what, "firstName")
	}

	if tgUser.LastName != user.GetLastNameValue() {
		// Try to keep up previous non-empty value
		if tgUser.LastName != "" {
			canged = true
			what = append(what, "lastName")
		}
	}

	if tgUser.Username != user.GetTgUsernameValue() {
		canged = true
		what = append(what, "tgUsername")
	}

	if tgUser.PhotoURL != user.GetTgPhotoUrlValue() {
		// Try to keep up previous non-empty value
		if tgUser.PhotoURL != "" {
			canged = true
			what = append(what, "tgPhotoUrl")
		}
	}

	if tgUser.IsPremium != user.TgPremium {
		canged = true
		what = append(what, "tgPremium")
	}

	fmt.Println("changed values:", what)

	return canged
}
