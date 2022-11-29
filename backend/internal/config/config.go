package config

import (
	"log"
	"oasis/backend/internal/utils"
	"strconv"
)

type AppConfig struct {
	Environment string
	EntryPort   string
	Auth        AuthConfig
	Database    PostgresConfig
	Telegram    TelegramConfig
	ExternalAPI ExternalAPIConfig
}

func NewAppConfig() *AppConfig {
	/*   internal   */
	ENTRY_PORT := utils.GetEnv("ENTRY_PORT")
	ENVIRONMENT := utils.GetEnv("ENVIRONMENT")

	authCfg := GetAuthConfig()
	databaseCfg := GetDatabaseConfig()
	telegramCfg := GetTelegramConfig()
	externalApiCfg := GetExternalAPIConfig()

	return &AppConfig{
		Environment: ENVIRONMENT,
		EntryPort:   ENTRY_PORT,
		Auth:        authCfg,
		Database:    databaseCfg,
		Telegram:    telegramCfg,
		ExternalAPI: externalApiCfg,
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

type ExternalAPIConfig struct {
	AudioBaseURL      string
	CoverImageBaseURL string
}

func GetExternalAPIConfig() ExternalAPIConfig {

	coverPath := utils.GetEnv("COVER_PATH")
	if coverPath == "" {
		log.Fatal("COVER_PATH is not specified")
	}

	audioPath := utils.GetEnv("AUDIO_PATH")
	if audioPath == "" {
		log.Fatal("AUDIO_PATH is not specified")
	}

	return ExternalAPIConfig{
		AudioBaseURL:      audioPath,
		CoverImageBaseURL: coverPath,
	}
}

type AuthConfig struct {
	ATsecret string
	RTsecret string
	ATexpMin int
	RTexpMin int
}

func GetAuthConfig() AuthConfig {

	atSecret := utils.GetEnv("AT_SECRET")
	if atSecret == "" {
		log.Fatal("AT_SECRET is not specified")
	}

	rtSecret := utils.GetEnv("RT_SECRET")
	if rtSecret == "" {
		log.Fatal("RT_SECRET is not specified")
	}

	atExp, err := strconv.Atoi(utils.GetEnv("AT_EXP_MIN"))
	if err != nil {
		log.Fatal("AT_EXP_MIN is not specified")
	}

	rtExp, err := strconv.Atoi(utils.GetEnv("RT_EXP_MIN"))
	if err != nil {
		log.Fatal("RT_EXP_MIN is not specified")
	}

	return AuthConfig{
		ATsecret: atSecret,
		RTsecret: rtSecret,
		ATexpMin: atExp,
		RTexpMin: rtExp,
	}
}
