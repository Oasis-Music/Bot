package auth

import "errors"

var (
	ErrJwtInternal      = errors.New("failed to authorize")
	ErrBearerNotPresent = errors.New("bearer token not present")
)

// Refresh-Token related
var (
	ErrRefreshNotExists = errors.New("RT not exists")
	ErrFailToSaveRT     = errors.New("failed to save RT")
	ErrGetRefreshData   = errors.New("failed to get RT data")
)

// Access-Token related
var (
	ErrGetAccessData = errors.New("failed to get AT data")
)
