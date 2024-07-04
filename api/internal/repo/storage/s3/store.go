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

const (
	AudioPrefix = "audio/"
	CoverPrefix = "cover/"
	testPrefix  = "test/"
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

func (s *objectStorage) PutAudio(ctx context.Context, data io.Reader) (string, error) {

	fileName := uuid.NewString() + ".mp3"

	_, err := s.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:       aws.String(s.config.S3.BucketName),
		Key:          aws.String(AudioPrefix + fileName),
		Body:         data,
		ContentType:  aws.String("audio/mpeg"),
		CacheControl: aws.String("public, max-age=31536000"),
	})
	if err != nil {
		return "", err
	}

	// fmt.Println(output.ResultMetadata)

	// like an error
	// fmt.Printf("etag: %v", aws.ToString(result.Output.ETag))

	return fileName, nil
}

func (s *objectStorage) PutCover(ctx context.Context, data io.Reader) (string, error) {

	fileName := uuid.NewString() + ".webp"

	_, err := s.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:       aws.String(s.config.S3.BucketName),
		Key:          aws.String(CoverPrefix + fileName),
		Body:         data,
		ContentType:  aws.String("image/webp"),
		CacheControl: aws.String("public, max-age=31536000"),
	})
	if err != nil {
		return "", err
	}

	// fmt.Println(output.ResultMetadata)

	return fileName, nil
}

func (s *objectStorage) DeleteObject(ctx context.Context, key string) (bool, error) {
	// 1. not versioned bucket
	// 2. there is no way to do something lit this with R2
	// Go: https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_DeleteObject_section.html
	_, err := s.client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(s.config.S3.BucketName),
		Key:    aws.String(key),
	})
	if err != nil {
		return false, err
	}

	return true, nil
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
