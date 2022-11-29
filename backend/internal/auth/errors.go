package auth

import "errors"

var (
	ErrDeleteNonexistentToken = errors.New("nonexistent token")
)
