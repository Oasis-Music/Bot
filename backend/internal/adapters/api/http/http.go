package http

import (
	"net/http"
	wranStorage "oasis/backend/internal/adapters/db/user"
	"oasis/backend/internal/auth"

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
	WARNStorage wranStorage.UserStorage
}

func (h *handler) Register(router chi.Router) {
	router.Post(refreshPath, h.RefreshToken)
}

func NewHandler(authService auth.AuthService, WARNStorage wranStorage.UserStorage) Handler {
	return &handler{authService: authService, WARNStorage: WARNStorage}
}
