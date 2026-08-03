const { Client } = require("pg");
const client = new Client({
  connectionString: process.argv[2]
});

const SQL_DROP = `
  DROP TABLE games CASCADE;
  DROP TABLE companies;
  DROP TABLE genres CASCADE;
  DROP TABLE platforms CASCADE;
  DROP TABLE games_genres;
  DROP TABLE games_platforms;
`;

async function main() {
  console.log("droping tables...");
  await client.connect();
  await client.query(SQL_DROP);
  await client.end();
  console.log("droping done");
}

main();