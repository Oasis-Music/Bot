DROP TABLE IF EXISTS soundtrack CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_soundtrack CASCADE;
DROP TABLE IF EXISTS auth_token CASCADE;
DROP TABLE IF EXISTS roles CASCADE;


CREATE TABLE roles (
    role_code TEXT PRIMARY KEY,
    permission TEXT
);

INSERT INTO roles (role_code, permission) VALUES ('admin', '*');
INSERT INTO roles (role_code, permission) VALUES ('user', 'track.');


CREATE TABLE users (
    id BIGINT PRIMARY KEY, -- telegram user id
    first_name TEXT NOT NULL,
    last_name TEXT,
    username TEXT,
    language_code TEXT,
    role TEXT NOT NULL DEFAULT 'user',  
    visited_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (role) REFERENCES roles(role_code) ON DELETE CASCADE
);


INSERT INTO users (id, first_name, last_name, username, language_code, role)
VALUES (1, 'Spongebob', 'Squarepants', null, 'en', 'admin');


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


CREATE TABLE user_soundtrack (
	user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
	soundtrack_id INT REFERENCES soundtrack(id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, soundtrack_id)
);


CREATE TABLE auth_token (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    token_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
