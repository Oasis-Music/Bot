package postgres

import "errors"

const (
	DuplicateKeyErrorCode    = "23505"
	KeyIsNotPresentErrorCode = "23503"
)

var (
	DuplicateKeyError    = errors.New("key already exists")
	KeyIsNotPresentError = errors.New("key is not present")
)

var (
	ErrNoData             = errors.New("no data found")
	ErrSoundtrackNotFound = errors.New("soundtrack not found")
)
