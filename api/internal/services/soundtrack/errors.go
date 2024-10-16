package soundtrack

import (
	"errors"
	"oasis/api/internal/repo/storage/postgres"
)

var (
	ErrStotageNoData = postgres.ErrNoData
)

// TODO: separe
var (
	ErrSoundtrackNotFound       = errors.New("soundtrack not found")
	ErrSoundtrackAlreadyExists  = errors.New("soundtrack already exists")
	ErrFailedToFetchSoundtrack  = errors.New("internal: failed to fetch soundtrack")
	ErrGetAllSoundtracks        = errors.New("internal: no soundtracks fetched")
	ErrInternalDeleteSoundtrack = errors.New("internal: failed to delete soundtrack")
)

var (
	ErrSoundtrackCreate = errors.New("failed to create soundtrack")
)
