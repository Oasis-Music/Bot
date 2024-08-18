package router

import (
	"oasis/api/internal/app/composite"
	"oasis/api/internal/config"
	"oasis/api/internal/delivery/graph"
	"oasis/api/internal/services/auth"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

func NewRouter(cfg *config.Config, authService auth.Service, appComposite composite.AppComposite) chi.Router {

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Cookie", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	}))

	r.Group(func(r chi.Router) {
		r.Use(authService.AuthMiddleware)
		r.Handle("/graphql", graph.NewHandler(cfg, appComposite))
	})

	if cfg.IsDev {
		r.Handle("/playground", playground.Handler("GraphiQL", "/graphql"))
	}

	return r
}
