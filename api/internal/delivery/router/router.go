package router

import (
	"oasis/api/internal/app/composites"
	"oasis/api/internal/auth"
	"oasis/api/internal/config"
	"oasis/api/internal/delivery/graph"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v4/pgxpool"
)

func NewRouter(cfg *config.Config, db *pgxpool.Pool, authService auth.AuthService, rootComposite composites.RootComposite) chi.Router {

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Cookie", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	}))

	r.Group(func(r chi.Router) {
		r.Use(authService.AuthMiddleware)
		r.Handle("/graphql", graph.NewHandler(rootComposite))
	})

	if cfg.Environment == config.DevEnv {
		r.Handle("/playground", playground.Handler("GraphiQL", "/graphql"))
	}

	return r
}
