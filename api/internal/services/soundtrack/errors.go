package soundtrack

import (
	"errors"
	"oasis/api/pkg/postgres"
)

var (
	ErrStorageNoData = postgres.ErrNoData
)

// TODO: separe
var (
	ErrSoundtrackNotFound  = errors.New("soundtrack not found")
	ErrFailedGetSoundtrack = errors.New("failed to get soundtrack")
	// ------------------------------------------------------------------------------------
	ErrSoundtrackAlreadyExists  = errors.New("soundtrack already exists")
	ErrFailedToFetchSoundtrack  = errors.New("internal: failed to fetch soundtrack") // todo del
	ErrGetAllSoundtracks        = errors.New("internal: no soundtracks fetched")
	ErrInternalDeleteSoundtrack = errors.New("internal: failed to delete soundtrack")
)

var (
	ErrSoundtrackCreate = errors.New("failed to create soundtrack")
)
