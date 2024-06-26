package s3

import (
	"context"
	"fmt"
	"io"
	appConfig "oasis/api/internal/config"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
)

const (
	AudioPrefix = "audio/"
	CoverPrefix = "cover/"
)

type objectStorage struct {
	config *appConfig.Config
	client *s3.Client
}

func New(appConfig *appConfig.Config) (*objectStorage, error) {

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("auto"),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider(appConfig.S3.AccessKeyID, appConfig.S3.AccessKeySecret, ""),
		),
	)
	if err != nil {
		return nil, err
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.r2.cloudflarestorage.com", appConfig.S3.AccountID))
	})

	return &objectStorage{
		config: appConfig,
		client: client,
	}, nil
}

func (o *objectStorage) PutObject(prefix string, data io.Reader) error {

	_, err := o.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(o.config.S3.BucketName),
		Key:    aws.String(prefix + uuid.NewString()),
		Body:   data,
	})

	if err != nil {
		return err
	}

	return nil
}
