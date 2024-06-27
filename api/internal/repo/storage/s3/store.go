package s3

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"log/slog"
	"oasis/api/internal/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
)

type ObjectPrefix string

const (
	AudioPrefix ObjectPrefix = "audio/"
	CoverPrefix ObjectPrefix = "cover/"
)

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

func (s *objectStorage) PutObject(ctx context.Context, prefix ObjectPrefix, data io.Reader) error {

	_, err := s.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(s.config.S3.BucketName),
		Key:    aws.String(string(prefix) + uuid.NewString()),
		Body:   data,
	})

	if err != nil {
		return err
	}

	return nil
}

func (s *objectStorage) Test() {

	output, err := s.client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(s.config.S3.BucketName),
	})
	if err != nil {
		log.Fatal(err)
	}

	for _, object := range output.Contents {
		obj, _ := json.MarshalIndent(object, "", "\t")
		fmt.Println(string(obj))
	}
}
