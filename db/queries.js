const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.LOCALDB
});

async function getAllCount() {
  const result = await pool.query("SELECT COUNT(*) FROM companies")
  const count = result.rows[0].count;
  return count;
}

async function getDevCount() {
  const result = await pool.query("SELECT COUNT(*) FROM companies WHERE is_developer = true");
  const count = result.rows[0].count;
  return count;
}

async function getPubCount() {
  const result = await pool.query("SELECT COUNT(*) FROM companies WHERE is_publisher = true");
  const count = result.rows[0].count;
  return count;
}

async function getDevPubCount() {
  const result = await pool.query("SELECT COUNT(*) FROM companies WHERE is_developer = true AND is_publisher = true");
  const count = result.rows[0].count;
  return count;
}

async function getAllCompanies() {
  const result = await pool.query("SELECT * FROM companies");
  return {
    count: result.rowCount,
    data: result.rows
  }
}

module.exports = {
  getAllCompanies,
  getAllCount,
  getDevCount,
  getPubCount,
  getDevPubCount
}