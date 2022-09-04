DROP TABLE IF EXISTS soundtracks;

CREATE TABLE soundtracks (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    duration SMALLINT NOT NULL,
    coverImage TEXT NOT NULL,
    fileURL TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

INSERT INTO
    soundtracks (
        title,
        author,
        duration,
        coverImage,
        fileURL
    )
VALUES
    (
        'Dinero',
        'MORGENSHTERN',
        142,
        'morgenshtern-kristal.jpeg',
        'track.mp3'
    );