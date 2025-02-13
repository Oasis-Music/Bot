package postgres

import "errors"

var (
	ErrRefreshNotExists = errors.New("current RT not exists")
)
