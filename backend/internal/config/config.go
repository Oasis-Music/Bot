package config

import (
	"log"
	"oasis/backend/internal/utils"
)

type AppConfig struct {
	Environment string
	EntryPort   string
	Database    PostgresConfig
	Telegram    TelegramConfig
}

func NewAppConfig() *AppConfig {
	ENTRY_PORT := utils.GetEnv("ENTRY_PORT")
	ENVIRONMENT := utils.GetEnv("ENVIRONMENT")
	databaseCfg := GetDatabaseConfig()
	telegramCfg := GetTelegramConfig()
	return &AppConfig{
		Environment: ENVIRONMENT,
		EntryPort:   ENTRY_PORT,
		Database:    databaseCfg,
		Telegram:    telegramCfg,
	}
}

type PostgresConfig struct {
	Host     string
	Port     string
	Name     string
	Username string
	Password string
	SSLMode  string
}

func GetDatabaseConfig() PostgresConfig {
	return PostgresConfig{
		Host:     utils.GetEnv("DB_HOST"),
		Port:     utils.GetEnv("DB_PORT"),
		Name:     utils.GetEnv("DB_NAME"),
		Username: utils.GetEnv("DB_USER"),
		Password: utils.GetEnv("DB_PASSWORD"),
		SSLMode:  utils.GetEnv("DB_SSLMODE"),
	}
}

type TelegramConfig struct {
	ApiURL    string
	Token     string
	EventPool int
}

func GetTelegramConfig() TelegramConfig {

	token := utils.GetEnv("TG_TOKEN")
	if token == "" {
		log.Fatal("telegram token is not specified")
	}
	host := utils.GetEnv("TG_HOST")
	if host == "" {
		log.Fatal("telegram host url is not specified")
	}

	return TelegramConfig{
		ApiURL:    host,
		Token:     token,
		EventPool: 100, // TODO: add to .env
	}
}
