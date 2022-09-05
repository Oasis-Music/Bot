DROP TABLE IF EXISTS soundtracks;

CREATE TABLE soundtracks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    duration SMALLINT NOT NULL,
    coverImage TEXT,
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
        'dinero.jpeg',
        'track.mp3'
    ),
    (
        'Cristal & МОЁТ',
        'MORGENSHTERN',
        130,
        'morgenshtern-kristal.jpeg',
        'track2.mp3'
    ),
    (
        'Зая',
        'Бамбинтон',
        204,
        'zaya.jpeg',
        'bambinton-zaya.mp3'
    ),
    (
        'Baby mama',
        'Скриптонит, Райда',
        210,
        'babymama.jpeg',
        'baby_mama.mp3'
    ),
    (
        'Novella',
        'Ivan Valeev',
        198,
        'ivan-valeev-novella.jpeg',
        'Ivan_valeevNovella.mp3'
    ),
    (
        '99 Problems',
        'Big Baby Tape, Kizaru',
        143,
        'bandana.jpeg',
        '99problem.mp3'
    ),
    (
        'MIDDLE OF THE NIGHT',
        'Elley Duhé',
        182,
        'middleofnight.jpeg',
        'middleofthenight.mp3'
    ),
    (
        'Call Out My Name',
        'The Weeknd',
        208,
        'callmyname.jpeg',
        'callmyname.mp3'
    ),
    (
        'Minor',
        'Miyagi & Andy Panda',
        153,
        'miyagi.jpeg',
        'Miyagi_Andy_Panda_Minor.mp3'
    ),
    (
        'El Problema',
        'MORGENSHTERN, Тимати',
        130,
        'el_problema.jpeg',
        'el_problema.mp3'
    ),
    (
        'After Dark',
        'Mr.Kitty',
        251,
        NULL,
        'After_Dark.mp3'
    );