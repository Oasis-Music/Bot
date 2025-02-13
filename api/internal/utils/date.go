package utils

import "time"

func FormatDate(t time.Time) string {
	return t.Format(time.RFC3339)
}

// CurrentTimestamp returns time like: 2025-01-13 12:34:16.332 +0000 UTC
// It contains current datetime in with actual local time but without timezone
func CurrentTimestamp() time.Time {
	return time.Now().UTC().Add(time.Hour * 2)
}
