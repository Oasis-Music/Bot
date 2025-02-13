package rest

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	authEntities "oasis/api/internal/services/auth/entities"
	"oasis/api/internal/utils"

	"github.com/golang-jwt/jwt/v5"
)

func (h *handler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", ContentTypeJSON)

	ctx := r.Context()

	cookie, err := r.Cookie(RefreshTokenCookieName)
	if err != nil {
		switch {
		case errors.Is(err, http.ErrNoCookie):
			http.Error(w, "cookie not found", http.StatusBadRequest)
		default:
			log.Println(err)

			http.Error(w, "server error", http.StatusInternalServerError)
		}
		return
	}

	token, err := h.authService.ParseRefreshToken(cookie.Value)
	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			err = h.authService.RevokeRefreshToken(ctx, token.RefreshId)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	err = h.authService.RevokeRefreshToken(ctx, token.RefreshId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	parsedId, err := utils.ParseInt64(token.UserId)
	if err != nil {
		http.Error(w, "wrong user id", http.StatusBadRequest)
		return
	}

	user, err := h.userService.User(ctx, parsedId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	tokenPair, err := h.authService.CreateJwtPair(authEntities.JwtPairPayload{
		UserID:    user.ID,
		FirstName: user.FirstName,
		UserRole:  string(user.Role),
	})
	if err != nil {
		fmt.Println("token parir gen", err)
		http.Error(w, "wrong token", http.StatusInternalServerError)
		return
	}

	err = h.authService.SaveRefreshToken(ctx, tokenPair)
	if err != nil {
		// todo: add logger
		fmt.Println("refresh token save", err)
		http.Error(w, "wrong token", http.StatusInternalServerError)
		return
	}

	h.SetRefreshTokenCookie(w, tokenPair.RefreshToken)

	w.WriteHeader(http.StatusOK)

	resp := TelegramAuthResponse{
		AccessToken: tokenPair.AccessToken,
	}

	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, "auth was failed", http.StatusInternalServerError)
	}

}
