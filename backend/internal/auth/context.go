package auth

type ContextKey string

const (
	UserID        ContextKey = "UserID"
	UnknownUserID string     = "unknown"
)
