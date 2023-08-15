package graph

import (
	"oasis/api/internal/useCase/soundtrack"
	"oasis/api/internal/useCase/user"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SoundtrackUC soundtrack.UseCase
	UserUC       user.UseCase
}
