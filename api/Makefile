DB_URL=postgres://postgres:postgres@localhost:5432/cristal?sslmode=disable

go:
	go run ./cmd/main.go
build:
	go build -o app cmd/main.go
prod:
	go run ./cmd/main.go -env=prod
gqlgen:
	go run github.com/99designs/gqlgen generate
lint:
	golangci-lint run --verbose
sqlc:
	sqlc generate

# DB
backup:
	pg_dump -U postgres -T auth_token -Fc cristal > ./init/backup.dmp
backup_full:
	pg_dump -U postgres -Fc cristal > ./init/backup.dmp
restore:
	pg_restore -U postgres -d cristal -v -c ./init/backup.dmp
docker_backup:
	docker exec -i db /bin/bash -c "PGPASSWORD=postgres pg_dump -U postgres -Fc cristal" > ./init/backup.dmp
docker_restore:
	docker exec -i db pg_restore -U postgres -d cristal -v -c < ./init/backup.dmp

# Migrations
migrate_new:
	migrate create -ext sql -seq  -dir ./migrations $(MIG_NAME)
migrate_up:
	# migrate -path ./migrations -database $(DB_URL) force 1
	migrate -database $(DB_URL) -verbose -path ./migrations up 1
migrate_down:
	migrate -path ./migrations -database $(DB_URL) -verbose down 1
migrate_force:
	migrate -database $(DB_URL) -verbose -path ./migrations force $(FORCE)