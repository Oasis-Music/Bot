package http

import (
	"net/http"
	"oasis/api/internal/auth"
	"oasis/api/internal/repo/storage/postgres/user"

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
	WARNStorage *user.UserStorage
}

func (h *handler) Register(router chi.Router) {
	router.Post(refreshPath, h.RefreshToken)
}

func NewHandler(authService auth.AuthService, WARNStorage *user.UserStorage) Handler {
	return &handler{authService: authService, WARNStorage: WARNStorage}
}
