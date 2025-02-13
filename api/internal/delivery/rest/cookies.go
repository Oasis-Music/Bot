package rest

import "net/http"

func (h *handler) SetRefreshTokenCookie(w http.ResponseWriter, token string) {
	cookieToken := http.Cookie{
		Name:     RefreshTokenCookieName,
		Value:    token,
		Path:     "/",
		MaxAge:   h.config.Auth.SessionRefreshTTL * 60,
		HttpOnly: true,
		Secure:   false,                // true FOR HTTPS
		SameSite: http.SameSiteLaxMode, // http.SameSiteStrictMode in prod evn
	}

	http.SetCookie(w, &cookieToken)
}
