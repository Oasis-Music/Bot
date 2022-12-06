package utils

import "strconv"

func FormatInt32(n int32) string {
	return strconv.FormatInt(int64(n), 10)
}
