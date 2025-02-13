package graph

import (
	"errors"
	"oasis/api/internal/delivery/graph/models"
	soundtrackEntities "oasis/api/internal/services/soundtrack/entities"
	"oasis/api/internal/utils"
)

func parseSoundtrackID(id string) (int64, error) {
	trackID, err := utils.ParseInt64(id)
	if err != nil {
		return -1, errors.New("invalid soundtrack id")
	}

	return trackID, nil
}

func buildSoundtrackModelV2(s *soundtrackEntities.Soundtrack) models.Soundtrack {

	return models.Soundtrack{
		ID:        utils.IntToString(s.ID),
		Title:     s.Title,
		Author:    s.Author,
		Duration:  s.Duration,
		CoverURL:  s.CoverImage,
		AudioURL:  s.Audio,
		Validated: false, // todo: remove
		CreatorID: utils.IntToString(s.CreatorID),
		Creator:   nil, // todo: move to loader
		Attached:  s.Attached,
		CreatedAt: utils.FormatDate(s.CreatedAt),
		// toto: add UpdatetAt
	}
}
