package db

import "time"

type SoundtrackDTO struct {
	ID         int64
	Title      string
	Author     string
	Duration   int
	CoverImage string
	FileURL    string
	CreatedAt  time.Time
}
