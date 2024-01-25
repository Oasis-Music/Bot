package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"oasis/api/internal/app"
	"oasis/api/internal/config"
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

	config := config.NewAppConfig()
	db, err := postgres.NewClient(context.Background(), config)
	if err != nil {
		fmt.Println("=============")
		log.Fatal(err)
		fmt.Println("=============")
	}

	defer db.Close()

	app := app.NewApp(db, config)

	app.Run()
}
