package user

import "errors"

var (
	ErrUserNotFound            = errors.New("user not found")
	ErrFailedToGetUserInternal = errors.New("internal: failed to get user")
)
