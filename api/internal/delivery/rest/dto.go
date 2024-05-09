package rest

type TelegramAuthRequest struct {
	InitData string `json:"initData"`
}

type TelegramAuthResponse struct {
	AccessToken string `json:"accessToken"`
}
