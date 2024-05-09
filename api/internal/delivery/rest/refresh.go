package rest

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
)

func (h *handler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

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
			err = h.authService.RevokeRefreshToken(ctx, token.RefreshUuid)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	err = h.authService.RevokeRefreshToken(ctx, token.RefreshUuid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	userID, err := strconv.ParseInt(token.UserId, 10, 64)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "invalid user ID", http.StatusBadRequest)
		return
	}

	user, err := h.userService.User(ctx, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	tokenPair, err := h.authService.CreateJwtPair(user.ID, user.FirstName)
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

	resp := TelegramAuthResponse{
		AccessToken: tokenPair.AccessToken,
	}

	w.WriteHeader(http.StatusOK)
	h.setRefreshTokenCookie(w, tokenPair.RefreshToken)

	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		log.Panicln(err)
		http.Error(w, "refresh NewEncoder err", http.StatusInternalServerError)
	}

}
