package rest

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (h *handler) TelegramAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var authRequestData TelegramAuthRequest

	if err := json.NewDecoder(r.Body).Decode(&authRequestData); err != nil {
		fmt.Println(err)
		http.Error(w, "wrong request body", http.StatusBadRequest)
		return

	}

	authData, err := h.userService.Authorize(r.Context(), authRequestData.InitData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp := TelegramAuthResponse{
		AccessToken: authData.AccessToken,
	}

	w.WriteHeader(http.StatusOK)
	h.setRefreshTokenCookie(w, authData.RefreshToken)
	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, "auth was failed", http.StatusInternalServerError)
	}
}
