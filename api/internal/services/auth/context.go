package auth

type ContextKey string

const (
	UserID   ContextKey = "UserID"
	UserRole ContextKey = "userRole"
)

const UnknownUserID string = "unknown"
