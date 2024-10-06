package logger

import (
	"log/slog"
	"oasis/api/internal/config"
	"os"
	"time"

	"github.com/lmittmann/tint"
)

func New(env string) *slog.Logger {

	var handler slog.Handler

	switch env {
	case config.DevEnv:

		handler = tint.NewHandler(os.Stdout, &tint.Options{
			Level:      slog.LevelDebug,
			TimeFormat: time.DateTime,
			ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {

				if a.Key == "error" {
					v, ok := a.Value.Any().(error)
					if !ok {
						return a
					}
					return tint.Err(v)
				}

				return a
			},
		})

	case config.ProdEnv:
		handler = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelDebug,
		})
	}

	handler = withMiddleware(handler)

	log := slog.New(handler)
	slog.SetDefault(log)

	return log
}
