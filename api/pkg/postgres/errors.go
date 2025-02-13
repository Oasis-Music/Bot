package postgres

import "errors"

var (
	ErrNoData       = errors.New("no result data")
	ErrNoDataInsert = errors.New("no data insert")
)
