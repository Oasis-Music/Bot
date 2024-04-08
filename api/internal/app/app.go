package app

import (
	"log/slog"
	"oasis/api/internal/app/composite"
	"oasis/api/internal/config"
	httpAPI "oasis/api/internal/delivery/api/http"
	"oasis/api/internal/delivery/router"
	"oasis/api/internal/repo/storage/postgres/sqlc"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/soundtrack"
	"oasis/api/internal/services/user"

	soundtrackRepo "oasis/api/internal/repo/storage/postgres/soundtrack"
	userRepo "oasis/api/internal/repo/storage/postgres/user"

	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi"
	"github.com/jackc/pgx/v4/pgxpool"
)

type App struct {
	config *config.Config
	router chi.Router
}

func NewApp(config *config.Config, logger *slog.Logger, db *pgxpool.Pool) *App {

	sqlc := sqlc.New(db)

	authService := auth.New(config, db)

	userStorage := userRepo.New(config, logger, db)
	userService := user.New(config, logger, userStorage, authService)

	soundtrackStorage := soundtrackRepo.New(config, logger, db, sqlc)
	soundtrackService := soundtrack.New(config, logger, soundtrackStorage, userService)

	appComposite := composite.AppComposite{
		SoundtrackService: soundtrackService,
		UserService:       userService,
	}

	r := router.NewRouter(config, db, authService, appComposite)

	httpHandler := httpAPI.NewHandler(authService, userStorage)
	httpHandler.Register(r)

	return &App{
		config: config,
		router: r,
	}
}

func (a *App) Run() {
	a.Serve()

}

func (a *App) Serve() {

	server := &http.Server{
		Addr:              ":" + a.config.Port,
		ReadHeaderTimeout: 500 * time.Millisecond,
		ReadTimeout:       1 * time.Second,
		Handler:           http.TimeoutHandler(a.router, 15*time.Second, "request timeout expired"),
	}

	if a.config.Environment == config.DevEnv {
		log.Printf("try to connect to http://localhost%s/playground for GraphQL playground", server.Addr)
	}

	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	log.Printf("server %q - shutting down", <-done)

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("❌ server shutdown failed:%+v", err)
	}

	log.Print("✅ server shutdown gracefully")
}
