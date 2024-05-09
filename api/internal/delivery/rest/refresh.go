package rest

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
)

func (h *handler) RefreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ctx := r.Context()

	b, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rt := string(b)
	if rt == "" {
		http.Error(w, "token not specified", http.StatusBadRequest)
		return
	}

	token, err := h.authService.ParseRefreshToken(rt)
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

	user, err := h.userStorage.User(ctx, userID)
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

	resp := struct {
		Token        string `json:"token"`
		RefreshToken string `json:"refreshToken"`
	}{
		Token:        tokenPair.AccessToken,
		RefreshToken: tokenPair.RefreshToken,
	}

	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, "NewEncoder err", http.StatusInternalServerError)
	}

}
