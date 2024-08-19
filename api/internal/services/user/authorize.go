package user

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"oasis/api/internal/entity"
	userStorage "oasis/api/internal/repo/storage/postgres/user"
	"oasis/api/internal/utils"
	"time"
)

const (
	TELEGRAM_SEED = "WebAppData"
	AUTH_FRESH_IN = 3
)

// Where should I place it?
// err = u.storage.UpdateVisitDate(ctx, user.ID)
// 	if err != nil {
// 		fmt.Println("last visit date update:", err)
// 		return nil, ErrIternalAuthorizationError
// 	}

func (u *userService) Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error) {
	if initData == "" {
		return nil, ErrInitDataInvalid
	}

	dataMap, err := url.ParseQuery(initData)
	if err != nil {
		return nil, ErrInitDataInvalid
	}

	initDataHash := dataMap.Get("hash")
	authDate := dataMap.Get("auth_date")

	if initDataHash == "" {
		return nil, ErrInitDataInvalid
	}

	if !u.config.IsDev {

		authFresh := isTelegramAuthDateValidIn(authDate, AUTH_FRESH_IN*time.Minute)
		if !authFresh {
			return nil, ErrTgAuthDateExpired
		}

	}

	validString := "auth_date=" + authDate + "\n" +
		"query_id=" + dataMap.Get("query_id") +
		"\n" + "user=" + dataMap.Get("user")

	gen := signTelegramData([]byte(u.config.Telegram.Token), []byte(TELEGRAM_SEED))

	hash := hex.EncodeToString(signTelegramData([]byte(validString), gen))

	if hash != initDataHash {
		u.logger.Error("invalid user hash", "initData", dataMap.Get("user"))
		return nil, errors.New("authorization failed")
	}

	var userData entity.UserInitData

	if err = json.Unmarshal([]byte(dataMap.Get("user")), &userData); err != nil {
		return nil, ErrInitDataInvalid
	}

	u.logger.Info("user trying to auth", "user_id", userData.Id)

	user, err := u.storage.User(ctx, userData.Id)
	if errors.Is(err, userStorage.ErrUserNotFound) {

		u.logger.Warn("user not found, create...")

		var newUser entity.NewUser

		newUser.ID = userData.Id
		newUser.FirstName = userData.FirstName
		// TODO: make enum dBNewUser.Role = db.UserRole
		newUser.Role = "user"

		if userData.LastName != "" {
			newUser.LastName = &userData.LastName
		}

		if userData.Username != "" {
			newUser.Username = &userData.Username
		}

		if userData.LanguageCode != "" {
			newUser.LanguageCode = &userData.LanguageCode
		}

		createdUser, err := u.storage.CreateUser(ctx, newUser)
		if err != nil {
			fmt.Println("Error during creation new user")
			return nil, err
		}

		u.logger.Info("created new user", "id", createdUser.ID)

		at, rt, err := u.genTokenPairandSave(ctx, createdUser.ID, createdUser.FirstName)
		if err != nil {
			fmt.Println("last visit date update:", err)
			return nil, ErrIternalAuthorizationError
		}

		return &entity.UserAuthorization{
			AccessToken:  at,
			RefreshToken: rt,
		}, nil

	} else if err != nil {
		return nil, ErrIternalAuthorizationError
	}

	/* Check if user change its data */

	isChanged, updatedUserData := isInitDataDifferent(userData, user)
	if isChanged {
		u.logger.Info("user data is different", "user_id", userData.Id)
		_, err = u.storage.UpdateUser(ctx, updatedUserData)
		if err != nil {
			fmt.Println(err)
			return nil, ErrIternalAuthorizationError
		}

		u.logger.Info("user data updated", "user_id", userData.Id)
	}

	firstName := user.FirstName

	if isChanged {
		firstName = updatedUserData.FirstName
	}

	at, rt, err := u.genTokenPairandSave(ctx, user.ID, firstName)
	if err != nil {
		u.logger.Error("gen tokens pair", "error", err)
		return nil, ErrIternalAuthorizationError
	}

	return &entity.UserAuthorization{
		AccessToken:  at,
		RefreshToken: rt,
	}, nil

}

func signTelegramData(msg, key []byte) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write(msg)
	return mac.Sum(nil)
}

func isInitDataDifferent(tgUser entity.UserInitData, user *entity.User) (bool, entity.UserUpdate) {

	// fmt.Printf("%+v\n", tgUser)

	var isChanged bool

	updatedUser := entity.UserUpdate{
		ID:           user.ID,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Username:     user.Username,
		LanguageCode: user.LanguageCode,
		VisitedAt:    time.Now(),
	}

	if tgUser.FirstName != user.FirstName {
		isChanged = true
		updatedUser.FirstName = tgUser.FirstName
	}

	if tgUser.LastName != user.GetLastNameValue() {
		if tgUser.LastName != "" {
			isChanged = true
			updatedUser.LastName = &tgUser.LastName
		}
	}

	if tgUser.Username != user.GetUsernameValue() {
		if tgUser.Username != "" {
			isChanged = true
			updatedUser.Username = &tgUser.Username
		}
	}

	if tgUser.LanguageCode != user.GetLanguageCodeValue() {
		if tgUser.LanguageCode != "" {
			isChanged = true
			updatedUser.LanguageCode = &tgUser.LanguageCode
		}
	}

	return isChanged, updatedUser
}

func (u *userService) genTokenPairandSave(ctx context.Context, userID int64, firstName string) (string, string, error) {

	rawTokenPair, err := u.authService.CreateJwtPair(userID, firstName)
	if err != nil {
		fmt.Println("token parir gen", err)
		return "", "", err
	}

	err = u.authService.SaveRefreshToken(ctx, rawTokenPair)
	if err != nil {
		return "", "", err
	}

	return rawTokenPair.AccessToken, rawTokenPair.RefreshToken, nil
}

func isTelegramAuthDateValidIn(src string, validIn time.Duration) bool {

	authTimestamp, err := utils.StrToInt64(src)
	if err != nil {
		return false
	}

	currentTimestamp := time.Now().Unix()

	timeFrame := int64(validIn.Seconds())

	if authTimestamp+timeFrame < currentTimestamp {
		return false
	}

	return true

}
