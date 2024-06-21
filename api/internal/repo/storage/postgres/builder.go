package postgres

import (
	"database/sql"
	"oasis/api/internal/entity"
)

func StringOrNil(n sql.NullString) *string {
	if !n.Valid {
		return nil
	}
	return &n.String
}

func SoundtrackFromDTO(coverURL string, audioURL string, dto SoundtrackDTO) entity.Soundtrack {

	var cover string

	if dto.CoverImage.Valid {
		cover = coverURL + dto.CoverImage.String
	}

	return entity.Soundtrack{
		ID:         dto.ID,
		Title:      dto.Title,
		Author:     dto.Author,
		Duration:   int(dto.Duration),
		CoverImage: cover,
		Audio:      audioURL + dto.AudioFile, // AudioFile
		Validated:  dto.IsValidated,
		Attached:   dto.Attached,
		CreatorID:  dto.CreatorID,
		CreatedAt:  dto.CreatedAt,
	}
}

func UserFromDTO(dto UserDTO) entity.User {

	return entity.User{
		ID:           dto.ID,
		FirstName:    dto.FirstName,
		Username:     StringOrNil(dto.Username),
		LastName:     StringOrNil(dto.LastName),
		LanguageCode: StringOrNil(dto.LanguageCode),
		Role:         string(dto.UserRole),
		VisitedAt:    dto.VisitedAt,
		CreatedAt:    dto.CreatedAt,
	}
}
