package db

import "time"

type SoundtrackDTO struct {
	ID        int64
	Title     string
	CreatedAt time.Time
}
