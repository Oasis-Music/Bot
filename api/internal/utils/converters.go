package utils

import (
	"crypto/sha256"
	"fmt"
	"io"
	"strconv"
)

func IntToString[T int32 | int64](n T) string {
	return strconv.FormatInt(int64(n), 10)
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

func StringToNilPtr(s string) *string {
	if len(s) == 0 {
		return nil
	}
	return &s
}

func GetSha256Hash(src io.Reader) (string, error) {
	h := sha256.New()

	if _, err := io.Copy(h, src); err != nil {
		return "", err
	}

	return fmt.Sprintf("%x", h.Sum(nil)), nil
}
