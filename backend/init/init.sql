DROP TABLE IF EXISTS soundtracks;

CREATE TABLE soundtracks (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

INSERT INTO
    soundtracks (
        title
    )
VALUES
    (
        'First mock soundtrack'
    );