CREATE TABLE roles (
    role_code TEXT PRIMARY KEY,
    permission TEXT
);

CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    username TEXT,
    language_code TEXT,
    user_role TEXT NOT NULL DEFAULT 'user',  
    visited_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (role) REFERENCES roles(role_code) ON DELETE CASCADE
);