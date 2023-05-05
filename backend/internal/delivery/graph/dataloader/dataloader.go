package dataloader

import (
	"context"
	"fmt"
	"oasis/backend/internal/app/composites"
	"oasis/backend/internal/delivery/graph/models"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/utils"
	"strings"

	"oasis/backend/internal/useCase/user"

	"github.com/graph-gophers/dataloader"
	gopher_dataloader "github.com/graph-gophers/dataloader"
)

type ctxKey string

const (
	loadersKey = ctxKey("dataloaders")
)

// DataLoader offers data loaders scoped to a context
type DataLoader struct {
	userLoader *dataloader.Loader
}

// GetUser wraps the User dataloader for efficient retrieval by user ID
func (i *DataLoader) GetUser(ctx context.Context, userID string) (*models.User, error) {
	thunk := i.userLoader.Load(ctx, gopher_dataloader.StringKey(userID))
	result, err := thunk()
	if err != nil {
		return nil, err
	}

	user := result.(entity.User)

	return &models.User{
		ID:           utils.Int64ToString(user.ID),
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
func NewDataLoader(rootComposite composites.RootComposite) *DataLoader {

	// instantiate the user dataloader
	users := &userBatcher{useCase: rootComposite.UserComposite.UseCase}
	// return the DataLoader
	return &DataLoader{
		userLoader: dataloader.NewBatchedLoader(users.get),
	}
}

// For returns the dataloader for a given context
func For(ctx context.Context) *DataLoader {
	return ctx.Value(loadersKey).(*DataLoader)
}

// userBatcher wraps storage and provides a "get" method for the user dataloader
type userBatcher struct {
	useCase user.UseCase
}

// get implements the dataloader for finding many users by Id and returns
// them in the order requested
func (u *userBatcher) get(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
	fmt.Printf("dataloader.userBatcher.get, users: [%s]\n", strings.Join(keys.Keys(), ","))
	// create a map for remembering the order of keys passed in
	keyOrder := make(map[string]int, len(keys))
	// collect the keys to search for
	var userIDs []string
	for ix, key := range keys {
		userIDs = append(userIDs, key.String())
		keyOrder[key.String()] = ix
	}

	var parsedIDs []int64

	for _, id := range userIDs {

		parsed, err := utils.StrToInt64(id)
		if err != nil {
			fmt.Println("here", err)
			return []*dataloader.Result{{Data: nil, Error: err}}
		}

		parsedIDs = append(parsedIDs, parsed)
	}

	dbRecords, err := u.useCase.GetUsers(ctx, parsedIDs)
	// if DB error, return
	if err != nil {
		return []*dataloader.Result{{Data: nil, Error: err}}
	}

	// construct an output array of dataloader results
	results := make([]*dataloader.Result, len(keys))
	// enumerate records, put into output
	for _, record := range dbRecords {

		recordID := utils.Int64ToString(record.ID)

		ix, ok := keyOrder[recordID]
		// if found, remove from index lookup map so we know elements were found
		if ok {
			results[ix] = &dataloader.Result{Data: record, Error: nil}
			delete(keyOrder, recordID)
		}
	}

	// fill array positions with errors where not found in DB
	for userID, ix := range keyOrder {
		err := fmt.Errorf("user not found %s", userID)
		results[ix] = &dataloader.Result{Data: nil, Error: err}
	}
	// return results

	return results
}
