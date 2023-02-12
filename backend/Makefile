go:
	go run ./cmd/main.go
prod:
	go run ./cmd/main.go -env=prod
gqlgen:
	go run -mod=mod github.com/99designs/gqlgen
backup:
	pg_dump -U postgres cristal > ./init/backup.bak
restore:
	psql -U postgres cristal < ./init/backup.bak
lint:
	golangci-lint run