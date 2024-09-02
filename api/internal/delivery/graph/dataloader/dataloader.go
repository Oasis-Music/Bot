package dataloader

import (
	"context"
	"fmt"
	"log"
	"oasis/api/internal/app/composite"
	"oasis/api/internal/delivery/graph/models"
	"oasis/api/internal/entity"
	"oasis/api/internal/services/user"
	"oasis/api/internal/utils"
	"strings"

	gql_dataloader "github.com/graph-gophers/dataloader"
)

type ctxKey string

const (
	loadersKey = ctxKey("dataloaders")
)

// DataLoader offers data loaders scoped to a context
type DataLoader struct {
	userLoader *gql_dataloader.Loader
}

// GetUser wraps the User dataloader for efficient retrieval by user ID
func (i *DataLoader) GetUser(ctx context.Context, userID string) (*models.User, error) {
	thunk := i.userLoader.Load(ctx, gql_dataloader.StringKey(userID))
	result, err := thunk()
	if err != nil {
		log.Println("batch creator", err)
		return nil, err
	}

	user, ok := result.(entity.User)
	if !ok {
		panic("something is not ok")
	}

	return &models.User{
		ID:           utils.IntToString(user.ID),
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Username:     user.Username,
		LanguageCode: user.LanguageCode,
		Role:         user.Role,
		VisitedAt:    user.VisitedAt.UTC().String(),
		CreatedAt:    user.CreatedAt.UTC().String(),
	}, nil

}

// NewDataLoader returns the instantiated Loaders struct for use in a request
func NewDataLoader(appComposite composite.AppComposite) *DataLoader {

	// instantiate the user dataloader
	users := &userBatcher{userService: appComposite.UserService}
	cache := &gql_dataloader.NoCache{}
	options := gql_dataloader.WithCache(cache)

	// return the DataLoader
	return &DataLoader{
		userLoader: gql_dataloader.NewBatchedLoader(users.get, options),
	}
}

// For returns the dataloader for a given context
func For(ctx context.Context) *DataLoader {
	return ctx.Value(loadersKey).(*DataLoader)
}

// userBatcher wraps storage and provides a "get" method for the user dataloader
type userBatcher struct {
	userService user.Service
}

// the result must be in the same order of the keys
func (u *userBatcher) get(ctx context.Context, keys gql_dataloader.Keys) []*gql_dataloader.Result {
	fmt.Printf("dataloader.userBatcher.get, users: [%s]\n", strings.Join(keys.Keys(), ","))

	usersID := make([]int64, 0, len(keys))

	for _, key := range keys {

		id, err := utils.StrToInt64(key.String())
		if err != nil {
			return []*gql_dataloader.Result{{Data: nil, Error: err}}
		}

		usersID = append(usersID, id)
	}

	dbRecords, err := u.userService.UsersByID(ctx, usersID)
	if err != nil {
		return []*gql_dataloader.Result{{Data: nil, Error: err}}
	}

	userMap := make(map[string]entity.User, len(dbRecords))

	for _, record := range dbRecords {

		userId := utils.IntToString(record.ID)
		_, ok := userMap[userId]
		if !ok {
			userMap[userId] = record
		}

	}

	results := make([]*gql_dataloader.Result, len(keys))

	for ind, keyValue := range keys {

		k := keyValue.String()

		user, ok := userMap[k]
		if !ok {
			results[ind] = &gql_dataloader.Result{Data: nil, Error: fmt.Errorf("cannot find a user #%s", k)}
			continue
		}

		results[ind] = &gql_dataloader.Result{Data: user, Error: nil}
	}

	return results
}
