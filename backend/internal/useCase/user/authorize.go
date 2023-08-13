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
	"oasis/backend/internal/entity"
	"time"

	"github.com/jackc/pgx/v4"
)

const telegramSeed = "WebAppData"

func (u *userUseCase) Authorize(ctx context.Context, initData string) (*entity.UserAuthorization, error) {
	if initData == "" {
		return nil, ErrInitDataInvalid
	}

	urlA, err := url.ParseQuery(initData)
	if err != nil {
		fmt.Println(err)
		return nil, ErrInitDataInvalid
	}

	tgHash := urlA.Get("hash")

	if tgHash == "" {
		fmt.Println(err)
		return nil, ErrInitDataInvalid
	}

	validString := "auth_date=" + urlA.Get("auth_date") + "\n" +
		"query_id=" + urlA.Get("query_id") +
		"\n" + "user=" + urlA.Get("user")

	gen := signData([]byte(u.config.Telegram.Token), []byte(telegramSeed))
	hash := hex.EncodeToString(signData([]byte(validString), gen))

	if hash != tgHash {
		return nil, errors.New("authorization failed")
	}

	var userData entity.UserInitData

	if err = json.Unmarshal([]byte(urlA.Get("user")), &userData); err != nil {
		fmt.Println(err)
		return nil, ErrInitDataInvalid
	}

	fmt.Printf("received user: %d\n", userData.Id)

	user, err := u.storage.User(ctx, userData.Id)
	if err == pgx.ErrNoRows {
		fmt.Println("user not found, create...")

		var newUser entity.NewUser

		newUser.ID = userData.Id
		newUser.FirstName = userData.FirstName
		newUser.Role = "user" // TODO: make enum dBNewUser.Role = db.UserRole

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

		fmt.Printf("created new user: %s\n", createdUser.FirstName)

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
		fmt.Println("Failed to get a user", err)
		return nil, ErrIternalAuthorizationError
	}

	isChanged, updatedUserData := isInitDataDifferent(userData, user)
	if isChanged {
		fmt.Println("user data is different")
		_, err = u.storage.UpdateUser(ctx, updatedUserData)
		if err != nil {
			fmt.Println(err)
			return nil, ErrIternalAuthorizationError
		}

		fmt.Println("user data has been updated")

	} else {
		fmt.Println("user data has not changed")

		err = u.storage.UpdateUserVisitDate(ctx, user.ID)
		if err != nil {
			fmt.Println("last visit date update:", err)
			return nil, ErrIternalAuthorizationError
		}
	}

	firstName := user.FirstName

	if isChanged {
		firstName = updatedUserData.FirstName
	}

	at, rt, err := u.genTokenPairandSave(ctx, user.ID, firstName)
	if err != nil {
		fmt.Println("last visit date update:", err)
		return nil, ErrIternalAuthorizationError
	}

	return &entity.UserAuthorization{
		AccessToken:  at,
		RefreshToken: rt,
	}, nil

}

func signData(msg, key []byte) []byte {
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
		fmt.Println("1 GetLastNameValue")
		if tgUser.LastName != "" {
			fmt.Println("1 GetLastNameValue")
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

func (u *userUseCase) genTokenPairandSave(ctx context.Context, userID int64, firstName string) (string, string, error) {

	rawTokenPair, err := u.auth.CreateJwtPair(userID, firstName)
	if err != nil {
		fmt.Println("token parir gen", err)
		return "", "", err
	}

	err = u.auth.SaveRefreshToken(ctx, rawTokenPair)
	if err != nil {
		fmt.Println("refresh token save", err)
		return "", "", err
	}

	return rawTokenPair.AccessToken, rawTokenPair.RefreshToken, nil
}
