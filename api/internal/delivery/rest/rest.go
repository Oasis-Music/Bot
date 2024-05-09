package rest

import (
	"net/http"
	"oasis/api/internal/config"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/user"

	"github.com/go-chi/chi"
)

type Handler interface {
	Register(r chi.Router)
}

type handler struct {
	config      *config.Config
	authService auth.Service
	userService user.Service
}

func (h *handler) Register(router chi.Router) {
	router.Post("/refresh", h.RefreshToken)
	router.Post("/telegram-auth", h.TelegramAuth)
}

func NewHandler(config *config.Config, authService auth.Service, userService user.Service) Handler {
	return &handler{
		config:      config,
		authService: authService,
		userService: userService,
	}
}

func (h *handler) setRefreshTokenCookie(w http.ResponseWriter, token string) {
	cookieToken := http.Cookie{
		Name:     RefreshTokenCookieName,
		Value:    token,
		Path:     "/",
		MaxAge:   h.config.Auth.RefreshTTL * 60,
		HttpOnly: true,
		Secure:   true,                 // true FOR HTTPS
		SameSite: http.SameSiteLaxMode, // http.SameSiteStrictMode in prod evn
	}

	http.SetCookie(w, &cookieToken)
}
