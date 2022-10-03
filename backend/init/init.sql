DROP TABLE IF EXISTS soundtrack CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_soundtrack CASCADE;

CREATE TABLE soundtrack (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    duration SMALLINT NOT NULL,
    cover_image TEXT,
    file_url TEXT NOT NULL,
    creator_id TEXT NOT NULL DEFAULT 'ozark',
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    tg_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);


CREATE TABLE user_soundtrack (
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	soundtrack_id INT REFERENCES soundtrack(id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, soundtrack_id)
);

INSERT INTO
    soundtrack (
        title,
        author,
        duration,
        cover_image,
        file_url
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
        'Новая Волна',
        'Morgenshtern, DJ Smash',
        159,
        'new_wave.jpeg',
        'morgenshtern-dj-smash-novaya-volna.mp3'
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
    ),
    (
        'No Type',
        'Rae Sremmurd',
        201,
        'notype7825.jpeg',
        'rae_sremmurd_no_type.mp3'
    ),
    (
        'I Mean It',
        'G-Eazy',
        237,
        'imeanit.jpeg',
        'g-eazy-i-mean-it.mp3'
    ),
    (
        'Smells Like Teen Spirit',
        'Nirvana',
        301,
        'nirvana.jpeg',
        'nirvana_smells_like_teen_spirit.mp3'
    ),
    (
        'Перемен',
        'КИНО',
        295,
        'peremen.jpeg',
        'kino_peremen.mp3'
    ),
    (
        'Falling',
        'Trevor Daniel',
        159,
        'falling_cover.jpeg',
        'falling.mp3'
    ),
    (
        'Хипстер',
        'Би-2',
        278,
        'b2.jpeg',
        'b2_hipster.mp3'
    ),
    (
        'Nothing Else Matters',
        'Metallica',
        388,
        'metallica.jpeg',
        'metallica_nothing_else_matters.mp3'
    ),
    (
        'Иностранец',
        'Валерий Меладзе',
        245,
        'inostranets.jpeg',
        'valerijj_meladze_inostranec.mp3'
    ),
    (
        'Капитал',
        'Ляпис Трубецкой',
        195,
        'kapital_cover.jpeg',
        'kaaaapital.mp3'
    ),
    (
        'Серпантин',
        'Markul',
        186,
        'markul_v1.jpg',
        'markul-serpantin.mp3'
    ),
    (
        'СКОЛЬКО СТОИТ ЛЮБОВЬ',
        'MORGENSHTERN, The Limba, NILETTO, Boombl4',
        214,
        'scolco_stoit_lubov.jpg',
        'skolko-stoit-lyubov.mp3'
    ),
    (
        'Conclusion The Transplant',
        'Nicholas Britell',
        429,
        'conclusion.jpeg',
        'Nicholas-Britell-Conclusion-The-Transplant.mp3'
    ),
    (
        'Ламбада',
        'T-Fest, Скриптонит',
        191,
        'lambada.jpeg',
        't-fest-skriptonit-lambada.mp3'
    ),
    (
        'Грустная Песня',
        'THRILL PILL, Егор Крид, MORGENSHTERN',
        226,
        'syka_hochet_deneg.jpeg',
        'grustnaya-pesnya.mp3'
    ),
    (
        'Black',
        'Gazirovka',
        165,
        'gazirovka_black.jpeg',
        'gazirovka-black.mp3'
    ),
    (
        'Малиновый Закат',
        'Макс Корж',
        178,
        'malinovy_zakat.jpeg',
        'maks-korzh-malinovyjj-zakat.mp3'
    ),
    (
        'Шантаж',
        'Макс Корж',
        194,
        'shantazh.jpeg',
        'maks-korzh-shantazh.mp3'
    ),
    (
        'Башня из слоновой кости',
        'Oxxxymiron',
        214,
        'gorgorod.jpeg',
        'bashnya_iz_slonovojj_kosti.mp3'
    );


INSERT INTO users (tg_id)
VALUES ('test_id_1'),
       ('test_id_2'),
       ('test_id_3');


INSERT INTO user_soundtrack (user_id, soundtrack_id)
VALUES (1, 1),
       (1, 2),
       (1, 5),
       (1, 6),
       (1, 10), -- next
       (2, 9),
       (2, 13),
       (2, 18);