package graph

import (
	"context"
	"fmt"
	"net/http"

	"oasis/backend/internal/adapters/graph/models"
	"oasis/backend/internal/auth"
	"oasis/backend/internal/composites"
	"oasis/backend/internal/domain/services/user"
	"oasis/backend/internal/utils"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/vektah/gqlparser/gqlerror"
)

type directiveHandler func(ctx context.Context, obj interface{}, next graphql.Resolver, role []models.Role) (res interface{}, err error)

func NewHandler(userService *user.UserService, rootComposite composites.RootComposite) http.Handler {

	resolver := &Resolver{
		SoundtrackService: rootComposite.SoundtrackComposite.Service,
		UserService:       rootComposite.UserComposite.Service,
	}

	config := Config{
		Resolvers: resolver,
	}

	config.Directives.HasRole = hasRoleDirectiveHandler(userService)

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

func hasRoleDirectiveHandler(userService *user.UserService) directiveHandler {
	return func(ctx context.Context, obj interface{}, next graphql.Resolver, role []models.Role) (res interface{}, err error) {
		fmt.Println("Required roles: ", role)

		userID := ctx.Value(auth.UserID).(string)

		fmt.Printf("request from %q\n", userID)

		if userID == auth.UnknownUserID {
			return nil, &gqlerror.Error{
				Message: "not authorized",
				Extensions: map[string]interface{}{
					"code": "401", // TODO: got 200 OK in response, why?
				},
			}
		}

		return next(ctx)
	}
}
