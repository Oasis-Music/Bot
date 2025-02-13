package graph

import (
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/entity"
	"oasis/api/internal/utils"
)

// todo: del
func buildSoundtrackModel(s entity.Soundtrack) models.Soundtrack {

	return models.Soundtrack{
		ID:        utils.IntToString(s.ID),
		Title:     s.Title,
		Author:    s.Author,
		Duration:  s.Duration,
		CoverURL:  utils.StringToNilPtr(s.CoverImage),
		AudioURL:  s.Audio,
		Validated: s.Validated,
		Attached:  s.Attached,
		CreatedAt: utils.FormatDate(s.CreatedAt),
		CreatorID: utils.IntToString(s.CreatorID),
	}
}
