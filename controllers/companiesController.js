const db = require("../db/companyQueries");

const pageContent = {
  all: {
    header: "All Companies",
    paragraph: "Here is the list of every company associated with gaming created in our inventory database."
  },
  dev: {
    header: "Developers only",
    paragraph: "This section contains developers who are behind the creation of the awesome games!"
  },
  pub: {
    header: "Publishers only",
    paragraph: "These companies are responsible for the marketing of the game and its distribution."
  },
  devpub: {
    header: "Developer&Publisher companies",
    paragraph: "These are gods! They do everything to make our lives happier!"
  }
}

async function companiesGet(req, res) {
  const filter = req.query.filter || "all";
  const result = await db.getCompanies(filter);
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
    },
    data: result,
    texts: pageContent[filter]
  });
}

async function companyGet(req, res) {
  const id = req.params.id;
  const company = await db.getCompany(id);
  console.log(company);
  res.render("company", { ...company });
}

module.exports = {
  companiesGet,
  companyGet
}