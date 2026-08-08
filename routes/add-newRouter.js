const { Router } = require("express");
const router = Router();

router.get("/company", (req, res) => {
  res.send("Add new company!")
});

router.get("/game", (req, res) => {
  res.send("Add new game!");
});

router.get("/", (req, res) => {
  res.redirect("/add-new/company");
});

module.exports = router;