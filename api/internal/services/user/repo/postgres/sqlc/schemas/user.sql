CREATE TABLE users (
  user_id bigint PRIMARY KEY,
  first_name text NOT NULL,
  last_name text,
  tg_username text,
  language_code text,
  tg_photo_url text,
  tg_premium boolean NOT NULL,
  role_id int NOT NULL REFERENCES users (user_id),
  online_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  created_at timestamp NOT NULL DEFAULT current_timestamp
);
