const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.LOCALDB
});

async function getAllGames() {
  const result = await pool.query("SELECT * FROM games");
  return {
    count: result.rowCount,
    games: result.rows
  }
}

module.exports = {
  getAllGames
}