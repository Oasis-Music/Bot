DB_URL=postgres://postgres:postgres@localhost:5432/cristal?sslmode=disable

go:
	go run ./cmd/main.go
prod:
	go run ./cmd/main.go -env=prod
gqlgen:
	go run -mod=mod github.com/99designs/gqlgen
lint:
	golangci-lint run --verbose

# DB
backup:
	pg_dump -U postgres -Fc cristal > ./init/backup.dmp
restore:
	pg_restore -U postgres -d cristal -v -c ./init/backup.dmp
docker_backup:
	docker exec -i db /bin/bash -c "PGPASSWORD=postgres pg_dump -U postgres -Fc cristal" > ./init/backup.dmp
docker_restore:
	docker exec -i db /bin/bash -c "PGPASSWORD=postgres pg_restore -U postgres -d cristal -v -c" ./init/backup.dmp

# Migrations
migrate_new:
	migrate create -ext sql -seq  -dir ./migrations $(MIG_NAME)
migrate_up:
	# migrate -path ./migrations -database $(DB_URL) force 1
	migrate -database $(DB_URL) -verbose -path ./migrations up 
migrate_down:
	migrate -path ./migrations -database $(DB_URL) -verbose down
migrate_force:
	migrate -database $(DB_URL) -verbose -path ./migrations force $(FORCE)