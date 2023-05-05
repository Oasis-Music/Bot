package dataloader

import (
	"context"
	"oasis/backend/internal/app/composites"
	"oasis/backend/internal/delivery/graph/models"
	"oasis/backend/internal/entity"
	"oasis/backend/internal/utils"

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
	cache := &gopher_dataloader.NoCache{}
	options := gopher_dataloader.WithCache(cache)

	// return the DataLoader
	return &DataLoader{
		userLoader: dataloader.NewBatchedLoader(users.get, options),
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

// the result must be in the same order of the keys
func (u *userBatcher) get(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
	// fmt.Printf("dataloader.userBatcher.get, users: [%s]\n", strings.Join(keys.Keys(), ","))

	usersID := make([]int64, 0, len(keys))

	for _, key := range keys {

		id, err := utils.StrToInt64(key.String())
		if err != nil {
			return []*dataloader.Result{{Data: nil, Error: err}}
		}

		usersID = append(usersID, id)
	}

	dbRecords, err := u.useCase.GetUsers(ctx, usersID)
	if err != nil {
		return []*dataloader.Result{{Data: nil, Error: err}}
	}

	userMap := make(map[string]entity.User, len(dbRecords))

	for _, record := range dbRecords {

		userId := utils.Int64ToString(record.ID)
		_, ok := userMap[userId]
		if !ok {
			userMap[userId] = record
		}

	}

	results := make([]*dataloader.Result, len(keys))

	for ind, keyValue := range keys {
		results[ind] = &dataloader.Result{Data: userMap[keyValue.String()], Error: nil}
	}

	return results
}
