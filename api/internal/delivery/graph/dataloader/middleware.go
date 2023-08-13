package dataloader

import (
	"context"
	"net/http"
)

// Middleware injects a DataLoader into the request context so it can be
// used later in the schema resolvers
func Middleware(loader *DataLoader, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		nextCtx := context.WithValue(r.Context(), loadersKey, loader)
		r = r.WithContext(nextCtx)
		next.ServeHTTP(w, r)
	})
}
