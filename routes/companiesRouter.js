const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("companies", {
    title: "Game Companies"
  });
});

module.exports = router;