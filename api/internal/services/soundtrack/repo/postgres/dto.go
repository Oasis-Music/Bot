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

func (s *storage) buildSoundtrackEntity(db SoundtrackDB) entities.Soundtrack {

	var cover *string

	dbCover := postgres.ParseNullStringValue(db.CoverImage)

	if dbCover != "" {
		x := s.config.FileApi.CoverApiURL + dbCover
		cover = &x
	}

	return entities.Soundtrack{
		ID:         db.ID,
		Title:      db.Title,
		Author:     db.Author,
		Duration:   int(db.Duration),
		CoverImage: cover,
		Audio:      s.config.FileApi.AudioApiURL + db.AudioFile,
		Attached:   db.Attached,
		CreatorID:  db.CreatorID,
		UpdatedAt:  db.UpdatedAt,
		CreatedAt:  db.CreatedAt,
	}
}
