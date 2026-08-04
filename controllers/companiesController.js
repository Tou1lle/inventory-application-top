const db = require("./../db/queries");

async function companiesGet(req, res) {
  const filter = req.query.filter || "all";
  const result = await db.getCompanies(filter);
  const [countAll, countDev, countPub, countDevPub] = await Promise.all([
    db.getAllCount(),
    db.getDevCount(),
    db.getPubCount(),
    db.getDevPubCount()
  ]);

  console.log(result);
  
  res.render("companies", {
    title: "Game Companies",
    counts: {
      all: countAll,
      dev: countDev,
      pub: countPub,
      devpub: countDevPub
    },
    data: result
  });
}

module.exports = {
  companiesGet
}