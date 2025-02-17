package utils

import (
	"crypto/md5"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"strconv"
)

func StrToInt64(s string) (int64, error) {
	n, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, fmt.Errorf("failed to convert %q to int64", s)
	}

	return n, nil
}

func StringToNilPtr(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

func GetMD5Hash(src io.Reader) (string, error) {
	h := md5.New()

	if _, err := io.Copy(h, src); err != nil {
		return "", err
	}

	return fmt.Sprintf("%x", h.Sum(nil)), nil
}

// ============================================================================== NEW

func IntToString[T int32 | int64](n T) string {
	return strconv.FormatInt(int64(n), 10)
}

func Int64ToString(n int64) string {
	return strconv.FormatInt(n, 10)
}

func ParseInt32(s string) (int32, error) {
	n, err := strconv.ParseInt(s, 10, 32)
	if err != nil {
		return 0, fmt.Errorf("failed to convert %q to int32", s)
	}

	return int32(n), nil
}

func ParseInt64(s string) (int64, error) {
	n, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return 0, fmt.Errorf("failed to convert %q to int64", s)
	}

	return n, nil
}

func Base64ToInt64(encodedString string) (int64, error) {

	decodedBytes, err := base64.StdEncoding.DecodeString(encodedString)
	if err != nil {
		return 0, err
	}

	n, err := strconv.ParseInt(string(decodedBytes), 10, 64)
	if err != nil {
		return 0, errors.New("failed to convert encodedString to int64")
	}

	return n, nil
}

func StringToBase64(src string) string {
	return base64.StdEncoding.EncodeToString([]byte(src))
}
