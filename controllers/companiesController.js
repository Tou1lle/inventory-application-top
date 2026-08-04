const db = require("./../db/queries");

async function companiesGetAll(req, res) {
  const result = await db.getAllCompanies();
  const [countAll, countDev, countPub, countDevPub] = await Promise.all([
    db.getAllCount(),
    db.getDevCount(),
    db.getPubCount(),
    db.getDevPubCount()
  ]);
  
  res.render("companies", {
    title: "Game Companies",
    counts: {
      all: countAll,
      dev: countDev,
      pub: countPub,
      devpub: countDevPub
    }
  });
}

module.exports = {
  companiesGetAll
}