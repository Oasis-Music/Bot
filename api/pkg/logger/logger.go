package logger

import (
	"log/slog"
	"oasis/api/internal/config"
	"os"
	"time"

	"github.com/lmittmann/tint"
)

func New(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case config.DevEnv:

		log = slog.New(
			tint.NewHandler(os.Stdout, &tint.Options{
				Level:      slog.LevelDebug,
				TimeFormat: time.DateTime,
			}),
		)

	case config.ProdEnv:
		log = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelDebug,
		}))
	}

	return log
}
