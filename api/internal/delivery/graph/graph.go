package graph

import (
	"context"
	"errors"
	"net/http"
	appConfig "oasis/api/internal/config"
	"strconv"
	"strings"

	"oasis/api/internal/app/composite"
	"oasis/api/internal/delivery/graph/dataloader"
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/user"
	"oasis/api/internal/utils"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

const (
	maxUploadSize = 20 * 1024 * 1024 // 20 Mb
)

type directiveHandler func(ctx context.Context, obj interface{}, next graphql.Resolver, role []models.Role) (res interface{}, err error)

func NewHandler(appComposite composite.AppComposite) http.Handler {

	resolver := &Resolver{
		SoundtrackService: appComposite.SoundtrackService,
		UserService:       appComposite.UserService,
	}

	config := Config{
		Resolvers: resolver,
	}

	loader := dataloader.NewDataLoader(appComposite)

	config.Directives.HasRole = hasRoleDirectiveHandler(appComposite.UserService)

	ENVIRONMENT := utils.GetEnv("ENVIRONMENT")

	srv := handler.New(NewExecutableSchema(config))
	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{
		MaxUploadSize: maxUploadSize,
	})

	srv.SetQueryCache(lru.New(1000))

	if ENVIRONMENT == appConfig.DevEnv {
		srv.Use(extension.Introspection{})
	}

	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	return dataloader.Middleware(loader, srv)
}

func hasRoleDirectiveHandler(userService user.Service) directiveHandler {
	return func(ctx context.Context, obj interface{}, next graphql.Resolver, role []models.Role) (res interface{}, err error) {

		var gqlUnauthErr = &gqlerror.Error{
			Path:    graphql.GetPath(ctx),
			Message: "unauthorized user",
			Extensions: map[string]interface{}{
				"code": "401",
			},
		}

		tokenUserId, ok := ctx.Value(auth.UserID).(string)
		if !ok {
			return nil, gqlUnauthErr
		}

		if tokenUserId == auth.UnknownUserID {
			return nil, gqlUnauthErr
		}

		userID, err := strconv.ParseInt(tokenUserId, 10, 64)
		if err != nil {
			return nil, errors.New("wrong user id")
		}

		userRole, err := userService.Role(ctx, userID)
		if err != nil {
			return nil, &gqlerror.Error{
				Path:    graphql.GetPath(ctx),
				Message: "failed to identify user role",
				Extensions: map[string]interface{}{
					"code": "400",
				},
			}
		}

		if !isRoleSuitable(role, userRole) {
			return nil, &gqlerror.Error{
				Path:    graphql.GetPath(ctx),
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
