package graph

import (
	"context"
	"errors"
	"net/http"
	"strconv"
	"strings"

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

	config.Directives.HasRole = hasRoleDirectiveHandler(rootComposite.UserComposite.Service)

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

func hasRoleDirectiveHandler(userService user.UserService) directiveHandler {
	return func(ctx context.Context, obj interface{}, next graphql.Resolver, role []models.Role) (res interface{}, err error) {

		tokenUserId := ctx.Value(auth.UserID).(string)

		if tokenUserId == auth.UnknownUserID {
			return nil, &gqlerror.Error{
				Message: "unauthorized user",
				Extensions: map[string]interface{}{
					"code": "401",
				},
			}
		}

		userID, err := strconv.ParseInt(tokenUserId, 10, 64)
		if err != nil {
			return nil, errors.New("wrong user id")
		}

		userRole, err := userService.GetRole(ctx, userID)
		if err != nil {
			return nil, &gqlerror.Error{
				Message: "failed to identify user role",
				Extensions: map[string]interface{}{
					"code": "400",
				},
			}
		}

		if !isRoleSuitable(role, userRole) {
			return nil, &gqlerror.Error{
				Message: "access denied",
				Extensions: map[string]interface{}{
					"code": "400",
				},
			}
		}

		ctx = context.WithValue(ctx, auth.UserRole, userRole)

		return next(ctx)
	}
}

func isRoleSuitable(roles []models.Role, userRole string) bool {
	for _, r := range roles {
		if r.String() == strings.ToUpper(userRole) {
			return true
		}
	}
	return false
}
