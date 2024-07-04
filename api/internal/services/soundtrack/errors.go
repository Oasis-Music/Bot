package soundtrack

import "errors"

// TODO: separe
var (
	ErrSoundtrackNotFound       = errors.New("soundtrack not found")
	ErrFailedToFetchSoundtrack  = errors.New("internal: failed to fetch soundtrack")
	ErrGetAllSoundtracks        = errors.New("internal: no soundtracks fetched")
	ErrInternalDeleteSoundtrack = errors.New("internal: failed to delete soundtrack")
)

var (
	ErrSoundtrackCreate = errors.New("failed to create soundtrack")
)
