CREATE TABLE auth_token (
  id UUID PRIMARY KEY,
  expires_at timestamp NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE user_role (
  role_id serial PRIMARY KEY,
  role_name text NOT NULL
);

INSERT INTO
  user_role (role_name)
VALUES
  ('user'),
  ('moderator'),
  ('admin');
