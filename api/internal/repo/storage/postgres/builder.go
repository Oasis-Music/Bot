package postgres

import "oasis/api/internal/entity"

func SoundtrackFromDTO(dto SoundtrackDTO) entity.Soundtrack {

	return entity.Soundtrack{
		ID:         dto.ID,
		Title:      dto.Title,
		Author:     dto.Author,
		Duration:   int(dto.Duration),
		CoverImage: &dto.CoverImage.String,
		Audio:      dto.AudioFile, // AudioFile
		Validated:  dto.IsValidated,
		Attached:   dto.Attached,
		CreatorID:  dto.CreatorID,
		CreatedAt:  dto.CreatedAt,
	}
}
