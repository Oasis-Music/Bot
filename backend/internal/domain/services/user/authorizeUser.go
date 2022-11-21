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
	"oasis/backend/internal/adapters/db"
	dbnull "oasis/backend/internal/adapters/db/db-null"
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/domain/entity"
	"time"

	"github.com/jackc/pgx/v4"
)

const TelegramSeed = "WebAppData"

var errInitDataInvalid = errors.New("initData string invalid")
var errIternal = errors.New("fail: internal error")

func (u *userService) AuthorizeUser(ctx context.Context, initData string) (*models.AuthorizationResponse, error) {
	if initData == "" {
		return nil, errInitDataInvalid
	}

	urlA, err := url.ParseQuery(initData)
	if err != nil {
		fmt.Println(err)
		return nil, errInitDataInvalid
	}

	tgHash := urlA.Get("hash")

	if tgHash == "" {
		fmt.Println(err)
		return nil, errInitDataInvalid
	}

	validString := "auth_date=" + urlA.Get("auth_date") + "\n" +
		"query_id=" + urlA.Get("query_id") +
		"\n" + "user=" + urlA.Get("user")

	gen := signData([]byte(u.config.Telegram.Token), []byte(TelegramSeed))
	hash := hex.EncodeToString(signData([]byte(validString), gen))

	if hash != tgHash {
		return nil, errors.New("authorization failed")
	}

	var userData entity.UserInitData

	if err := json.Unmarshal([]byte(urlA.Get("user")), &userData); err != nil {
		fmt.Println(err)
		return nil, errInitDataInvalid
	}

	fmt.Printf("received user: %d first_name: %q\n", userData.Id, userData.FirstName)

	user, err := u.storage.GetUser(ctx, userData.Id)
	if err == pgx.ErrNoRows {
		fmt.Println("User not found, create")

		var dBNewUser db.CreateUserParams

		dBNewUser.ID = userData.Id
		dBNewUser.FirstName = userData.FirstName

		if userData.LastName != "" {
			dBNewUser.LastName = dbnull.NewNullString(userData.LastName, true)
		}

		if userData.Username != "" {
			dBNewUser.Username = dbnull.NewNullString(userData.Username, true)
		}

		if userData.LanguageCode != "" {
			dBNewUser.LanguageCode = dbnull.NewNullString(userData.LanguageCode, true)
		}

		newUser, err := u.storage.CreateUser(ctx, dBNewUser)
		if err != nil {
			fmt.Println("Error during creation new user")
			return nil, err
		}

		fmt.Println("Created new user: ", newUser)

		return &models.AuthorizationResponse{
			Token: "Successfully authorized",
		}, nil

	} else if err != nil {
		fmt.Println("Failed to get a user", err)
		return nil, errIternal
	}

	isChanged, updatedUserData := isInitDataDifferent(userData, user)
	if isChanged {
		fmt.Println("user data is different")
		_, err := u.storage.UpdateUser(ctx, updatedUserData)
		if err != nil {
			fmt.Println(err)
			return nil, errIternal
		}

		fmt.Println("user data has been updated")

	} else {
		fmt.Println("user data has not changed")
	}

	return &models.AuthorizationResponse{
		Token: "Successfully authorized",
	}, nil

}

func signData(msg, key []byte) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write(msg)
	return mac.Sum(nil)
}

func isInitDataDifferent(tgUser entity.UserInitData, dbUser db.UserDTO) (bool, db.UpdateUserParams) {

	var isChanged bool

	updatedUser := db.UpdateUserParams{
		ID:           dbUser.ID,
		FirstName:    dbUser.FirstName,
		LastName:     dbUser.LastName,
		Username:     dbUser.Username,
		LanguageCode: dbUser.LanguageCode,
		VisitedAt:    time.Now(),
	}

	if tgUser.FirstName != dbUser.FirstName {
		isChanged = true
		updatedUser.FirstName = tgUser.FirstName
	}

	if tgUser.LastName != dbUser.LastName.ValueOrDefault() {
		if tgUser.LastName != "" {
			isChanged = true
			updatedUser.LastName = dbnull.NewNullString(tgUser.LastName, true)
		}
	}

	if tgUser.Username != dbUser.Username.ValueOrDefault() {
		if tgUser.Username != "" {
			isChanged = true
			updatedUser.Username = dbnull.NewNullString(tgUser.Username, true)
		}
	}

	if tgUser.LanguageCode != dbUser.LanguageCode.ValueOrDefault() {
		if tgUser.LanguageCode != "" {
			isChanged = true
			updatedUser.LanguageCode = dbnull.NewNullString(tgUser.LanguageCode, true)
		}
	}

	return isChanged, updatedUser
}
