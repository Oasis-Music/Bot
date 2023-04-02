package user

import "errors"

// TODO: separate
var (
	ErrUserNotFound              = errors.New("user not found")
	ErrInitDataInvalid           = errors.New("initData string invalid")
	ErrIternalAuthorizationError = errors.New("authorization failed: internal error")
	ErrUserTracksNotFound        = errors.New("user or tracks not found")
	ErrIternalUserTracksError    = errors.New("failed to fetch user soundtracks")
	ErrTrackAlreadyAttached      = errors.New("soundtrack already attached to user")
	ErrUserOrTrackNotPresent     = errors.New("user or track is not present")
	ErrTrackAttachment           = errors.New("failed to attach soundtrack to user")
	ErrTrackUnattachment         = errors.New("failed to unattached track from the user")
)
