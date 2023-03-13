package router

import (
	"oasis/backend/internal/adapters/graph"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/composites"
	"oasis/backend/internal/config"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v4/pgxpool"
)

func NewRouter(config *config.AppConfig, db *pgxpool.Pool, authService auth.AuthService, rootComposite composites.RootComposite) chi.Router {

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

	if config.Environment == "development" {
		r.Handle("/playground", playground.Handler("GraphiQL", "/graphql"))
	}

	return r
}
