package auth

import "errors"

var (
	ErrJwtInternal = errors.New("failed to authorize")
)

// Refresh-Token related
var (
	ErrRefreshNotExists = errors.New("refresh token not exists")
	ErrFailToSaveRT     = errors.New("failed to save RT")
	ErrGetRefreshData   = errors.New("failed to get RT data")
)

// Access-Token related
var (
	ErrGetAccessData = errors.New("failed to get AT data")
)
