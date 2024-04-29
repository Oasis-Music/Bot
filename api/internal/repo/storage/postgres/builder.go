package postgres

import "oasis/api/internal/entity"

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
		CoverImage: &cover,
		Audio:      audioURL + dto.AudioFile, // AudioFile
		Validated:  dto.IsValidated,
		Attached:   dto.Attached,
		CreatorID:  dto.CreatorID,
		CreatedAt:  dto.CreatedAt,
	}
}
