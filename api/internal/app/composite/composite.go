package composite

import (
	"oasis/api/internal/services/soundtrack"
	"oasis/api/internal/services/user"
)

type AppComposite struct {
	SoundtrackService soundtrack.Service
	UserService       user.Service
}
