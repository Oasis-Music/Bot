package graph

import (
	"errors"
	"fmt"
	"oasis/api/internal/utils"
)

func parsePaginationCursor(src string) (int64, error) {

	parsedCursor, err := utils.Base64ToInt64(src)
	if err != nil {
		fmt.Println(err)
		return 0, errors.New("invalid cursor value - must be int")
	}

	return parsedCursor, nil
}
