CREATE TABLE author (
    id BIGINT PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_info TEXT,
    author_image TEXT,
    language_code TEXT,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE author_soundtrack (
    id BIGINT PRIMARY KEY,
    author_id BIGINT,
    soundtrack_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (author_id) REFERENCES author(id) ON DELETE CASCADE,
    FOREIGN KEY (soundtrack_id) REFERENCES soundtrack(id) ON DELETE CASCADE
);
