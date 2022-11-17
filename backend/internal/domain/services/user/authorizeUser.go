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
	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/domain/entity"
)

const TelegramSeed = "WebAppData"

var errInitDataInvalid = errors.New("initData string invalid")

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

	if hash == tgHash {

		var userData entity.UserInitData

		if err := json.Unmarshal([]byte(urlA.Get("user")), &userData); err != nil {
			fmt.Println(err)
			return nil, errInitDataInvalid
		}

		fmt.Printf("User: %d first_name: %q lang: %q\n", userData.Id, userData.FirstName, userData.LanguageCode)

		return &models.AuthorizationResponse{
			Token: "Successfully authorized",
		}, nil
	}

	return nil, errors.New("authorization failed")

}

func signData(msg, key []byte) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write(msg)
	return mac.Sum(nil)
}
