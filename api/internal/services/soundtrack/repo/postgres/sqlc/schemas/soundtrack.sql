CREATE TABLE soundtrack (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  duration smallint NOT NULL,
  cover_image text,
  audio_file text NOT NULL,
  creator_id bigint NOT NULL REFERENCES users (user_id),
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE soundtrack_hash (
  id bigserial PRIMARY KEY,
  hash text UNIQUE NOT NULL,
  soundtrack_id bigint NOT NULL REFERENCES soundtrack (id) ON DELETE CASCADE
);

CREATE TABLE user_soundtrack (
  user_id bigint REFERENCES users (user_id) ON DELETE CASCADE,
  soundtrack_id bigint REFERENCES soundtrack (id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (user_id, soundtrack_id)
);
