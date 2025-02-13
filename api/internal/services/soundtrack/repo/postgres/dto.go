package postgres

import (
	"database/sql"
	"oasis/api/internal/services/soundtrack/entities"
	"oasis/api/pkg/postgres"
	"time"
)

type SoundtrackDB struct {
	ID         int64
	Title      string
	Author     string
	Duration   int16
	CoverImage sql.NullString
	AudioFile  string
	CreatorID  int64
	UpdatedAt  time.Time
	CreatedAt  time.Time
	Attached   bool
}

func buildSoundtrackEntity(s SoundtrackDB) entities.Soundtrack {

	return entities.Soundtrack{
		ID:         s.ID,
		Title:      s.Title,
		Author:     s.Author,
		Duration:   int(s.Duration),
		CoverImage: postgres.ParseNullStringPtr(s.CoverImage),
		Audio:      s.AudioFile,
		Attached:   s.Attached,
		CreatorID:  s.CreatorID,
		UpdatedAt:  s.UpdatedAt,
		CreatedAt:  s.CreatedAt,
	}
}
