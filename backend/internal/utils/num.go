package utils

import (
	"fmt"
	"strconv"
)

func Int32ToString(n int32) string {
	return strconv.FormatInt(int64(n), 10)
}

func Int64ToString(n int64) string {
	return strconv.FormatInt(n, 10)
}

func StrToInt32(s string) (int32, error) {
	n, err := strconv.ParseInt(s, 10, 32)
	if err != nil {
		return 0, fmt.Errorf("failed to convert %q to int32", s)
	}

	return int32(n), nil
}

func StrToInt64(s string) (int64, error) {
	n, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, fmt.Errorf("failed to convert %q to int64", s)
	}

	return n, nil
}
