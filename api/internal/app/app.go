package app

import (
	"log/slog"
	"oasis/api/internal/app/composite"
	"oasis/api/internal/config"
	"oasis/api/internal/delivery/rest"
	"oasis/api/internal/delivery/router"
	"oasis/api/internal/repo/storage/postgres/sqlc"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/soundtrack"
	"oasis/api/internal/services/user"

	authRepo "oasis/api/internal/repo/storage/postgres/auth"
	soundtrackRepo "oasis/api/internal/repo/storage/postgres/soundtrack"
	userRepo "oasis/api/internal/repo/storage/postgres/user"
	s3Repo "oasis/api/internal/repo/storage/s3"

	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/go-chi/chi"
	"github.com/jackc/pgx/v4/pgxpool"
)

type App struct {
	config *config.Config
	router chi.Router
}

func NewApp(config *config.Config, logger *slog.Logger, db *pgxpool.Pool, s3client *s3.Client) *App {

	sqlc := sqlc.New(db)
	s3 := s3Repo.New(config, logger, s3client)

	authStorage := authRepo.New(db, sqlc)
	authService := auth.New(config, logger, authStorage)

	userStorage := userRepo.New(config, logger, db, sqlc)
	userService := user.New(config, logger, userStorage, authService)

	soundtrackStorage := soundtrackRepo.New(config, logger, db, sqlc)
	soundtrackService := soundtrack.New(config, logger, soundtrackStorage, s3, userService)

	appComposite := composite.AppComposite{
		SoundtrackService: soundtrackService,
		UserService:       userService,
	}

	router := router.NewRouter(config, authService, appComposite)

	restHandler := rest.NewHandler(config, authService, userService)
	restHandler.Register(router)

	return &App{
		config: config,
		router: router,
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

	if a.config.IsDev {
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
