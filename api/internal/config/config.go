package config

import (
	"log"

	"github.com/ilyakaznacheev/cleanenv"
)

const (
	DevEnv  = "development"
	ProdEnv = "production"
)

type Config struct {
	Port        string `env:"ENTRY_PORT" env-required:"true"`
	Environment string `env:"ENVIRONMENT" env-required:"true"`
	Auth        AuthConfig
	Database    PostgresConfig
	Telegram    TelegramConfig
	FileApi     FileApiConfig
}

func New() *Config {
	var cfg Config

	err := cleanenv.ReadEnv(&cfg)
	if err != nil {
		log.Fatalln("fail to parse config")
	}

	return &cfg
}

type AuthConfig struct {
	AccessSecret  string `env:"AT_SECRET" env-required:"true"`
	RefreshSecret string `env:"RT_SECRET" env-required:"true"`
	AccessTTL     int    `env:"AT_EXP_MIN" env-required:"true"`
	RefreshTTL    int    `env:"RT_EXP_MIN" env-required:"true"`
}

type PostgresConfig struct {
	Host     string `env:"DB_HOST" env-required:"true"`
	Port     string `env:"DB_PORT" env-required:"true"`
	Name     string `env:"DB_NAME" env-required:"true"`
	Username string `env:"DB_USER" env-required:"true"`
	Password string `env:"DB_PASSWORD" env-required:"true"`
	SSLMode  string `env:"DB_SSLMODE" env-required:"true"`
}

type TelegramConfig struct {
	ApiURL    string `env:"TG_HOST" env-required:"true"`
	Token     string `env:"TG_TOKEN" env-required:"true"`
	EventPool int    `env:"TG_EVENTPOOL" env-required:"true"`
}

type FileApiConfig struct {
	AudioApiURL string `env:"AUDIO_PATH" env-required:"true"`
	CoverApiURL string `env:"COVER_PATH" env-required:"true"`
}
