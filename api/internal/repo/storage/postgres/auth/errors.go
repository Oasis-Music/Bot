package auth

import "errors"

var (
	ErrRefreshNotExists = errors.New("current RT not exists")
)
