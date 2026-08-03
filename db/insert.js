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
  `;

async function main() {
  console.log("seeding...");
  await client.connect();
  await client.query(SQL_INSERT);
  await client.end();
  console.log("seeding done");
}

main();