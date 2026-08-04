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

async function runCompaniesSearch(filter) {
  switch (filter) {
    case "all":
      return await pool.query("SELECT * FROM companies");
      break;
    case "dev":
      return await pool.query("SELECT * FROM companies WHERE is_developer = true");
      break;
    case "pub":
      return await pool.query("SELECT * FROM companies WHERE is_publisher = true");
      break;
    case "devpub":
      return await pool.query("SELECT * FROM companies WHERE is_developer = true AND is_publisher = true");
      break
    default:
      return null;
      break;
  }
}

async function getCompanies(filter) {
  const result = await runCompaniesSearch(filter);
  if (!result) {
    return null;
  }
  return {
    count: result.rowCount,
    companies: result.rows
  }
}

module.exports = {
  getCompanies,
  getAllCount,
  getDevCount,
  getPubCount,
  getDevPubCount
}