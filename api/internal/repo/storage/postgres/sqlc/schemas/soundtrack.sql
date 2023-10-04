CREATE TABLE soundtrack (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    duration SMALLINT NOT NULL,
    cover_image TEXT,
    audio_file TEXT NOT NULL,
    is_validated BOOLEAN NOT NULL DEFAULT false,
    creator_id BIGINT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET DEFAULT
);
