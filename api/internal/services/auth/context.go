package auth

import (
	"context"
	"errors"
)

type ContextKey string

const (
	UserIdCtxKey   ContextKey = "UserID"
	UserRoleCtxKey ContextKey = "userRole"
)

const UnknownUserID string = "unknown"

func (a *authService) ContextUserIdValue(ctx context.Context) (int64, error) {
	userId, ok := ctx.Value(UserIdCtxKey).(int64)
	if !ok {
		return -1, errors.New("auth.UserIdCtxKey type cast error")
	}

	return userId, nil
}

func (a *authService) ContextUserRoleValue(ctx context.Context) (string, error) {
	role, ok := ctx.Value(UserRoleCtxKey).(string)
	if !ok {
		return "", errors.New("auth.UserRoleCtxKey type cast error")
	}

	return role, nil
}
