package app

import (
	"oasis/api/internal/app/composites"
	"oasis/api/internal/auth"
	"oasis/api/internal/config"
	httpAPI "oasis/api/internal/delivery/api/http"
	"oasis/api/internal/delivery/router"
	"oasis/api/internal/repo/storage/postgres/sqlc"

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

	sqlc := sqlc.New(db)

	authService := auth.NewAuthService(config, db)

	userComposite := composites.NewUserComposite(db, config, authService)
	soundtrackComposite := composites.NewSoundtrackComposite(config, db, sqlc, userComposite)

	rootComposite := composites.RootComposite{
		SoundtrackComposite: soundtrackComposite,
		UserComposite:       userComposite,
	}

	r := router.NewRouter(config, db, authService, rootComposite)

	httpHandler := httpAPI.NewHandler(authService, userComposite.WARNSotage)
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
		Addr:              ":" + a.config.EntryPort,
		ReadHeaderTimeout: 500 * time.Millisecond,
		ReadTimeout:       1 * time.Second,
		Handler:           http.TimeoutHandler(a.router, 15*time.Second, "request timeout expired"),
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
