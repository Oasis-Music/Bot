package graph

import (
	"oasis/api/internal/services/soundtrack"
	"oasis/api/internal/services/user"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SoundtrackService soundtrack.Service
	UserService       user.Service
}
