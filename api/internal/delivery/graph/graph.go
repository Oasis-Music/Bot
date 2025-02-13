package graph

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"oasis/api/internal/app/composite"
	"oasis/api/internal/config"
	"oasis/api/internal/delivery/graph/dataloader"
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/services/auth"
	"time"

	"github.com/vektah/gqlparser/v2/ast"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
)

const (
	maxUploadSize = 20 * 1024 * 1024 // 20 Mb
)

type hasRoleDirective func(ctx context.Context, obj any, next graphql.Resolver, role []models.Role) (res any, err error)

func NewHandler(appConfig *config.Config, appComposite composite.AppComposite) http.Handler {

	resolver := &Resolver{
		SoundtrackService: appComposite.SoundtrackService,
		UserService:       appComposite.UserService,
	}

	config := Config{
		Resolvers: resolver,
	}

	loader := dataloader.NewDataLoader(appComposite)

	config.Directives.HasRole = hasRoleDirectiveHandler(appComposite.AuthService)

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

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	if appConfig.IsDev {
		srv.Use(extension.Introspection{})
	}

	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	return dataloader.Middleware(loader, srv)
}

func doesRoleMatches(userRole string, roles []models.Role) bool {
	for _, r := range roles {
		if r.String() == strings.ToUpper(userRole) {
			return true
		}
	}
	return false
}

func hasRoleDirectiveHandler(authService auth.Service) hasRoleDirective {
	return func(ctx context.Context, obj any, next graphql.Resolver, acceptedRoles []models.Role) (res any, err error) {

		userId, ok := ctx.Value(auth.UserIdCtxKey).(int64)
		if !ok {
			return nil, extension401Err(ctx, "role directive: no user authorized")
		}

		fmt.Println("try to get user role", userId)
		userRole, err := authService.UserRole(ctx, userId)
		if err != nil {
			return nil, extension401Err(ctx, err.Error())
		}

		if !doesRoleMatches(userRole, acceptedRoles) {
			return nil, extension401Err(ctx, "role not match "+userRole)
		}

		ctx = context.WithValue(ctx, auth.UserRoleCtxKey, userRole)

		return next(ctx)
	}
}
