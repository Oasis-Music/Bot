CREATE TABLE user_soundtrack (
	user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
	soundtrack_id INT REFERENCES soundtrack(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY (user_id, soundtrack_id)
);