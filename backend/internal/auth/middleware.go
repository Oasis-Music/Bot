package auth

import (
	"context"
	"net/http"
)

func (a *authService) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		rawToken, err := a.extractHeaderToken(r)

		processToken := func(r *http.Request) {

			token, err := a.ParseAccessToken(rawToken)
			if err != nil {
				ctx = context.WithValue(ctx, UserID, UnknownUserID)
				return
			}

			ctx = context.WithValue(ctx, UserID, token.UserID)
		}

		if rawToken != "" && err == nil {
			processToken(r)
		} else {
			ctx = context.WithValue(ctx, UserID, UnknownUserID)
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
