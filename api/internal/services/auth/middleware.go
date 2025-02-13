package auth

import (
	"context"
	"errors"
	"net/http"
	"oasis/api/internal/utils"
	"regexp"
)

func (a *authService) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		rawToken, err := a.extractHeaderToken(r)
		if err != nil {
			if a.config.IsDev {
				a.logger.Error("extract Auth header token", "error", err)
			}

			ctx = context.WithValue(ctx, UserIdCtxKey, UnknownUserID)

		} else {

			token, err := a.ParseAccessToken(rawToken)
			if err != nil {
				if a.config.IsDev {
					a.logger.Error("parse session token", "error", err)
				}
				ctx = context.WithValue(ctx, UserIdCtxKey, UnknownUserID)

				next.ServeHTTP(w, r.WithContext(ctx))
				return
			}

			// token passed sign validation
			userId, _ := utils.ParseInt64(token.UserID)

			ctx = context.WithValue(ctx, UserIdCtxKey, userId)
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (a *authService) extractHeaderToken(r *http.Request) (string, error) {

	headerTokenRegexp := regexp.MustCompile(`Bearer\s([a-zA-Z0-9\.\-_]+)$`)

	var token string

	matches := headerTokenRegexp.FindStringSubmatch(r.Header.Get("Authorization"))
	if len(matches) >= 2 {
		token = matches[1]
	}

	if token == "" {
		return "", errors.New("bearer token not present, next try to /refresh")

	}

	return token, nil
}
