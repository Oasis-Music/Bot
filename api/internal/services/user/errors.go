package user

import (
	"errors"
	"oasis/api/pkg/postgres"
)

var (
	ErrTgAuthDateExpired = errors.New("telegram auth_date expired")
)

var (
	ErrStorageNoData = postgres.ErrNoData
)

// TODO: separate | refactor
var (
	ErrUserNotFound              = errors.New("user not found")
	ErrFailedGetUser             = errors.New("failed to get user")
	ErrInitDataInvalid           = errors.New("initData is invalid")
	ErrIternalAuthorizationError = errors.New("authorization failed: internal error")
	ErrTrackAlreadyAttached      = errors.New("soundtrack already attached to user")
	ErrUserOrTrackNotPresent     = errors.New("user or track is not present")
	ErrTrackAttachment           = errors.New("failed to attach soundtrack to user")
	ErrTrackUnattachment         = errors.New("failed to unattached track from the user")
)

// soundtracks related
var (
	ErrGetUserTracks      = errors.New("failed to fetch user soundtracks")
	ErrUserTracksNotFound = errors.New("user tracks not found")
)
