CREATE TABLE auth_token (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    refresh_token_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);