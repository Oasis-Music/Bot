package main

import (
	"context"
	"flag"
	"log"
	"oasis/api/internal/app"
	"oasis/api/internal/config"
	"oasis/api/pkg/logger"
	"oasis/api/pkg/postgres"

	"github.com/joho/godotenv"
)

func init() {
	env := flag.String("env", "dev", "specify .env filename for flag")
	flag.Parse()

	if *env == "dev" {
		if err := godotenv.Load(".env.local"); err != nil {
			log.Fatal("No .env.local file found")
		}
		log.Println("loaded .env.local")
	}

	if err := godotenv.Load(".env." + *env); err != nil {
		log.Fatalf("No .env.%s file found, load default", *env)
	}

	log.Printf("loaded \".env.%s\"\n", *env)

}

func main() {
	config := config.New()
	logger := logger.New(config.Environment)

	db, err := postgres.NewClient(context.Background(), config)
	if err != nil {
		logger.Error(err.Error())
		log.Fatal(err)
	}

	defer db.Close()

	app := app.NewApp(config, logger, db)

	app.Run()
}
