package http

import (
	"net/http"
	"oasis/api/internal/auth"
	"oasis/api/internal/services/user"

	"github.com/go-chi/chi"
)

const (
	refreshPath = "/refresh"
)

type Handler interface {
	Register(r chi.Router)
	RefreshToken(w http.ResponseWriter, r *http.Request)
}

type handler struct {
	authService auth.AuthService
	userStorage user.UserStorage
}

func (h *handler) Register(router chi.Router) {
	router.Post(refreshPath, h.RefreshToken)
}

func NewHandler(authService auth.AuthService, userStorage user.UserStorage) Handler {
	return &handler{
		authService: authService,
		userStorage: userStorage,
	}
}
