package logger

import (
	"context"
	"log/slog"
)

type handlerMiddlware struct {
	next slog.Handler
}

func withMiddleware(next slog.Handler) *handlerMiddlware {
	return &handlerMiddlware{next: next}
}

func (h *handlerMiddlware) Enabled(ctx context.Context, rec slog.Level) bool {
	return h.next.Enabled(ctx, rec)
}

func (h *handlerMiddlware) Handle(ctx context.Context, rec slog.Record) error {
	if c, ok := ctx.Value(logKey).(logCtx); ok {
		rec.Add("user_id", c.UserID)
	}
	return h.next.Handle(ctx, rec)
}

func (h *handlerMiddlware) WithAttrs(attrs []slog.Attr) slog.Handler {
	return &handlerMiddlware{next: h.next.WithAttrs(attrs)}
}

func (h *handlerMiddlware) WithGroup(name string) slog.Handler {
	return &handlerMiddlware{next: h.next.WithGroup(name)}
}

func withUserID(ctx context.Context, userID string) context.Context {
	return context.WithValue(ctx, logKey, logCtx{UserID: userID})
}

// inject context

func Handler(ctx context.Context, userID string) context.Context {
	ctx = withUserID(ctx, userID)
	return ctx
}
