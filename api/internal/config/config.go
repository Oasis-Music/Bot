package config

import (
	"log"

	"github.com/caarlos0/env/v11"
)

const (
	DevEnv  = "development"
	ProdEnv = "production"
)

type Config struct {
	IsDev       bool
	Port        string `env:"ENTRY_PORT,required"`
	Environment string `env:"ENVIRONMENT,required"`
	Auth        AuthConfig
	Database    PostgresConfig
	Telegram    TelegramConfig
	FileApi     FileApiConfig
	S3          S3Config
}

func New() *Config {
	var cfg Config

	err := env.Parse(&cfg)
	if err != nil {
		log.Fatalln("fail to parse config", err)
	}

	cfg.IsDev = cfg.Environment == DevEnv

	return &cfg
}

type AuthConfig struct {
	AccessSecret  string `env:"AT_SECRET,required"`
	RefreshSecret string `env:"RT_SECRET,required"`
	AccessTTL     int    `env:"AT_EXP_MIN,required"`
	RefreshTTL    int    `env:"RT_EXP_MIN,required"`
}

type PostgresConfig struct {
	Host     string `env:"DB_HOST,required"`
	Port     string `env:"DB_PORT,required"`
	Name     string `env:"DB_NAME,required"`
	Username string `env:"DB_USER,required"`
	Password string `env:"DB_PASSWORD,required"`
	SSLMode  string `env:"DB_SSLMODE,required"`
}

type TelegramConfig struct {
	ApiURL    string `env:"TG_HOST,required"`
	Token     string `env:"TG_TOKEN,required"`
	EventPool int    `env:"TG_EVENTPOOL,required"`
}

type FileApiConfig struct {
	AudioApiURL string `env:"AUDIO_PATH,required"`
	CoverApiURL string `env:"COVER_PATH,required"`
}

type S3Config struct {
	AccountID       string `env:"ACCOUNT_ID,required"`
	AccessKeyID     string `env:"ACCESS_KEY_ID,required"`
	AccessKeySecret string `env:"ACCESS_KEY_SECRET,required"`
	BucketName      string `env:"BUCKET_NAME,required"`
}
