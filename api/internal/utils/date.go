package utils

import "time"

func FormatISODate(t time.Time) string {
	return t.Format(time.RFC3339)
}
