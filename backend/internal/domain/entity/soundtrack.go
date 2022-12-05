package entity

import "time"

type Soundtrack struct {
	ID         int32
	Title      string
	Author     string
	Duration   int
	CoverImage *string
	Audio      string
	Validated  bool
	CreatorID  int64
	CreatedAt  time.Time
}
