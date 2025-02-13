package rest

type WebAppAuthData struct {
	InitData string `json:"initData"`
}

type TelegramAuthResponse struct {
	AccessToken string `json:"accessToken"`
}
