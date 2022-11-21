package app

import (
	"oasis/backend/internal/adapters/router"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/composites"
	"oasis/backend/internal/config"

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
	config *config.AppConfig
	router chi.Router
}

func NewApp(db *pgxpool.Pool, config *config.AppConfig) *App {

	authService := auth.NewAuthService(config, db)

	soundtrackComposite := composites.NewSoundtrackComposite(db, config)
	userComposite := composites.NewUserComposite(db, config, authService)

	rootComposite := composites.RootComposite{
		SoundtrackComposite: soundtrackComposite,
		UserComposite:       userComposite,
	}

	r := router.NewRouter(config, db, authService, rootComposite)

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
		Addr:    ":" + a.config.EntryPort,
		Handler: a.router,
	}

	if a.config.Environment == "development" {
		log.Printf("try to connect to http://localhost:%s/playground for GraphQL playground", a.config.EntryPort)
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
