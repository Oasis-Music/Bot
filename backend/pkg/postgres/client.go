package postgres

import (
	"context"
	"errors"
	"fmt"
	"log"
	"oasis/backend/internal/config"
	"time"

	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
)

const (
	maxAttempts = 5
)

type Client interface {
	Exec(ctx context.Context, sql string, arguments ...interface{}) (pgconn.CommandTag, error)
	Query(ctx context.Context, sql string, args ...interface{}) (pgx.Rows, error)
	QueryRow(ctx context.Context, sql string, args ...interface{}) pgx.Row
	Begin(ctx context.Context) (pgx.Tx, error)
}

func NewClient(ctx context.Context, config *config.AppConfig) (*pgxpool.Pool, error) {

	cfg := config.Database

	str := "host=%s user=%s password=%s dbname=%s port=%s sslmode=%s"
	connString := fmt.Sprintf(str, cfg.Host, cfg.Username, cfg.Password, cfg.Name, cfg.Port, cfg.SSLMode)

	var retryDuration time.Duration

	for i := 0; i < maxAttempts; i++ {
		ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
		defer cancel()

		pool, err := pgxpool.Connect(ctx, connString)
		if err == nil {
			if err := pool.Ping(context.Background()); err != nil {
				log.Printf("couldn't ping postgre database: %v", err)
				continue
			}

			return pool, nil
		}

		log.Println("Failed to connect to postgres, retrying")

		retryDuration = time.Duration(i*2) * time.Second

		if i != maxAttempts-1 {
			time.Sleep(retryDuration)
		}

	}

	return nil, errors.New("postgres don't respond")
}
