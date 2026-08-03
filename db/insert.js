const { Client } = require("pg");
const client = new Client({
  connectionString: process.argv[2]
});

const SQL_INSERT = `
  INSERT INTO companies (name, founded_year, country, info, website, image_file, is_developer, is_publisher)
  VALUES
  ('Naughty Dog', '1989-1-1', 'United States', 'Video game company', 'someurl', '1234567', true, false),
  ('Ubisoft', '1986-3-28', 'France', NULL, NULL, NULL, true, true),
  ('Dice', '1992-5-1', 'Sweden', 'Battlefield games', 'someurl', '2345', true, false),
  ('Warhorse', '2011-7-25', 'Czechia', NULL, 'someurl', '123445', true, false),
  ('CD Project RED', '1994-5-1', 'Poland', 'Kinda peak company', 'someurl', '1234', true, true);

  INSERT INTO platforms (name)
  VALUES
  ('PlayStation'),
  ('Xbox'),
  ('Nintento'),
  ('PC'),
  ('Mobile');

  INSERT INTO genres (name) 
  VALUES
  ('Action'),
  ('Adventure'),
  ('RPG'),
  ('Soulslike'),
  ('Strategy'),
  ('Simulation'),
  ('Sports'),
  ('Racing'),
  ('Puzzle'),
  ('Platformer'),
  ('Fighting'),
  ('Shooter'),
  ('Horror'),
  ('Survival'),
  ('Stealth'),
  ('MMO'),
  ('Card Game'),
  ('Party'),
  ('Sandbox'),
  ('Visual Novel'),
  ('Online game');

  INSERT INTO games (name, release_date, description, image_file, developer_id, publisher_id)
  VALUES
  ('The Last of Us', '2013-6-14', 'A zombie horror story game', '123456', 1, 1),
  ('Cyberpunk 2077', '2020-12-10', 'Futuristic dystopian role-playing game', '1234567', 5, 5),
  ('Battlefield 1', '2016-10-21', 'FPS set in WW1', '1234', 3, NULL);

  INSERT INTO games_genres (game_id, genre_id)
  VALUES
  (1, 1), (1, 2), (1, 13), (1, 14),
  (2, 1), (2, 2), (2, 3), (2, 12),
  (3, 12), (3, 21);

  INSERT INTO games_platforms (game_id, platform_id)
  VALUES
  (1, 1),
  (2, 1), (2, 2), (2, 4),
  (3, 1), (3, 2), (3, 4)
  `;

async function main() {
  console.log("seeding...");
  await client.connect();
  await client.query(SQL_INSERT);
  await client.end();
  console.log("seeding done");
}

main();