package composite

import (
	"oasis/api/internal/services/auth"
	"oasis/api/internal/services/soundtrack"
	"oasis/api/internal/services/user"
)

type AppComposite struct {
	AuthService       auth.Service
	SoundtrackService soundtrack.Service
	UserService       user.Service
}
