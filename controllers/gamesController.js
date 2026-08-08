const db = require("./../db/gameQueries");

async function gamesGetAll(req, res) {
  const data = await db.getAllGames();
  res.render("games", { ...data });
}

module.exports = {
  gamesGetAll
}