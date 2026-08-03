const { Client } = require("pg");
const client = new Client({
  connectionString: process.argv[2]
})

const SQL_CREATE = `
  CREATE TABLE games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    release_date DATE,
    description TEXT,
    image_file VARCHAR(100),
    developer_id INTEGER,
    publisher_id INTEGER
  );

  CREATE TABLE companies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    founded_year DATE,
    country VARCHAR(50),
    info TEXT,
    website VARCHAR(255),
    image_file VARCHAR(100),
    is_developer BOOLEAN NOT NULL DEFAULT FALSE,
    is_publisher BOOLEAN NOT NULL DEFAULT FALSE
  );

  CREATE TABLE genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE
  );

  CREATE TABLE platforms (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE
  );

  CREATE TABLE games_genres (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER NOT NULL,
    genre_id INTEGER NOT NULL
  );

  CREATE TABLE games_platforms (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game_id INTEGER NOT NULL,
    platform_id INTEGER NOT NULL
  );

  ALTER TABLE games ADD CONSTRAINT game_company_dev FOREIGN KEY (developer_id) REFERENCES companies (id) ON DELETE SET NULL DEFERRABLE INITIALLY IMMEDIATE;
  ALTER TABLE games ADD CONSTRAINT game_company_pub FOREIGN KEY (publisher_id) REFERENCES companies (id) ON DELETE SET NULL DEFERRABLE INITIALLY IMMEDIATE;
  ALTER TABLE games_genres ADD CONSTRAINT game_genre_game_id FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
  ALTER TABLE games_genres ADD CONSTRAINT game_genre_genre_id FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
  ALTER TABLE games_platforms ADD CONSTRAINT game_platform_game_id FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
  ALTER TABLE games_platforms ADD CONSTRAINT game_platform_platform_id FOREIGN KEY (platform_id) REFERENCES platforms (id) ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
`;

async function main() {
  console.log("creating tables...");
  try {
    await client.connect();
    await client.query(SQL_CREATE);
    await client.end();
    console.log("creation done");
  } catch (error) {
    console.log("Name", error.name);
    console.log("Message", error.message);
    console.log("Stack", error.stack);
  }
}

main();