package graph

import (
	"net/http"
	"oasis/backend/internal/composites"
	"oasis/backend/internal/utils"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/jackc/pgx/v4/pgxpool"
)

func NewHandler(db *pgxpool.Pool, rootComposite composites.RootComposite) http.Handler {

	resolver := &Resolver{
		SoundtrackService: rootComposite.SoundtrackComposite.Service,
	}

	config := Config{
		Resolvers: resolver,
	}

	ENVIRONMENT := utils.GetEnv("ENVIRONMENT")

	srv := handler.New(NewExecutableSchema(config))
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	if ENVIRONMENT == "development" {
		srv.Use(extension.Introspection{})
	}

	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	return srv
}
