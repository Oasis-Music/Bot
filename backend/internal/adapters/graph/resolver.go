package graph

import (
	"oasis/backend/internal/useCase/soundtrack"
	"oasis/backend/internal/useCase/user"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SoundtrackUC soundtrack.UseCase
	UserUC       user.UseCase
}
