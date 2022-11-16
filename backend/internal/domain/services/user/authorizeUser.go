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
	"sort"
	"strings"
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

	hash := urlA.Get("hash")

	if hash == "" {
		fmt.Println(err)
		return nil, errInitDataInvalid
	}

	unscString, err := url.PathUnescape(initData)
	if err != nil {
		fmt.Println(err)
		return nil, errInitDataInvalid
	}

	// fmt.Println(unscString)

	splited := strings.Split(unscString, "&")

	validKeys := make([]string, 0, 3)

	for _, v := range splited {
		key, _, _ := strings.Cut(v, "=")
		if key != "hash" {
			validKeys = append(validKeys, v)
		}
	}

	sort.Strings(validKeys)

	validString := strings.Join(validKeys, "\n")

	tgSeed := []byte(TelegramSeed)
	tgToken := []byte(u.config.Telegram.Token)

	gen := signData(tgToken, tgSeed)
	finalHash := hex.EncodeToString(signData([]byte(validString), gen))

	if finalHash == hash {

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
