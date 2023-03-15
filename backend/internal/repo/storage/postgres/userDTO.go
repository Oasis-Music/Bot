package postgres

type UserTracksResult struct {
	Total       int64
	Soundtracks []SoundtrackDTO
}
