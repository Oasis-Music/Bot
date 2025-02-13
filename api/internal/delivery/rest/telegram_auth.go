package rest

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (h *handler) WebAppAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", ContentTypeJSON)

	var data WebAppAuthData

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		fmt.Println(err)
		http.Error(w, "wrong request body", http.StatusBadRequest)
		return
	}

	authData, err := h.userService.Authorize(r.Context(), data.InitData)
	if err != nil {
		// http.StatusConflict
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	h.SetRefreshTokenCookie(w, authData.RefreshToken)

	w.WriteHeader(http.StatusOK)

	resp := TelegramAuthResponse{
		AccessToken: authData.AccessToken,
	}

	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		http.Error(w, "auth was failed", http.StatusInternalServerError)
	}

}
