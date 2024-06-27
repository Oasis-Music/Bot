package s3

import (
	"context"
	"io"
	"log/slog"
	"oasis/api/internal/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
)

const (
	AudioPrefix = "audio/"
	CoverPrefix = "cover/"
)

type S3store interface {
	PutObject(prefix string, data io.Reader) error
}

type objectStorage struct {
	config *config.Config
	logger *slog.Logger
	client *s3.Client
}

func New(config *config.Config, logger *slog.Logger, client *s3.Client) *objectStorage {

	return &objectStorage{
		config: config,
		logger: logger,
		client: client,
	}
}

func (s *objectStorage) PutObject(prefix string, data io.Reader) error {

	_, err := s.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(s.config.S3.BucketName),
		Key:    aws.String(prefix + uuid.NewString()),
		Body:   data,
	})

	if err != nil {
		return err
	}

	return nil
}
