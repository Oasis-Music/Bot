package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"time"
)

const (
	tgWebAppSeed = "WebAppData"
)

// Sign key-value string like: auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>
func (a *authService) SignTgDataCheckString(checkString string) string {
	m := hmac.New(sha256.New, []byte(tgWebAppSeed))
	m.Write(a.meta.telegramToken)

	im := hmac.New(sha256.New, m.Sum(nil))
	im.Write([]byte(checkString))

	return hex.EncodeToString(im.Sum(nil))
}

func (a *authService) IsTelegramAuthTimeValid(timestamp int64) bool {

	currentTimestamp := time.Now().Unix()
	timeFrame := int64(a.meta.tgAuthFreshIn.Seconds())

	if timestamp+timeFrame < currentTimestamp {
		return false
	}

	return true

}
