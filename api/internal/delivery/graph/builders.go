package graph

import (
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/entity"
	"oasis/api/internal/utils"
)

func buildUserModel(u *entity.User) models.User {

	return models.User{
		ID:           utils.IntToString(u.ID),
		FirstName:    u.FirstName,
		LastName:     u.LastName,
		Username:     u.Username,
		LanguageCode: u.LanguageCode,
		Role:         u.Role,
		VisitedAt:    utils.FormatDate(u.VisitedAt),
		CreatedAt:    utils.FormatDate(u.CreatedAt),
	}
}

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
