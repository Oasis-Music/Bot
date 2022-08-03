package graph

import (
	"oasis/backend/internal/domain/services/soundtrack"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SoundtrackService soundtrack.SoundtrackService
}
