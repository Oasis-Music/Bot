package soundtrack

import "errors"

var (
	ErrSoundtrackNotFound      = errors.New("soundtrack not found")
	ErrFailedToFetchSoundtrack = errors.New("internal: failed to fetch soundtrack")
	ErrGetAllSoundtracks       = errors.New("internal: no soundtracks fetched")
)
