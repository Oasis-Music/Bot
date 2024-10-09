package logger

type logCtx struct {
	UserID string
}

type LogContextKey int

const logKey = LogContextKey(0)
