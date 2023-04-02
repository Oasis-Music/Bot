package entity

import (
	"time"
)

type Soundtrack struct {
	ID         int32
	Title      string
	Author     string
	Duration   int
	CoverImage *string
	Audio      string
	Validated  bool
	Attached   bool
	CreatorID  int64
	CreatedAt  time.Time
}

type NewSoundtrackInput struct {
	Title      string
	Author     string
	CoverImage *Upload
	Audiofile  Upload
}

type NewSoundtrack struct {
	Title       string
	Author      string
	Duration    int16
	CoverImage  *string
	AudioFile   string
	IsValidated bool
	CreatorID   int64
}

type SoundtrackFilter struct {
	Page   int
	UserID int64
}

type SoundtrackList struct {
	Soundtracks []Soundtrack
}
