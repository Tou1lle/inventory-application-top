const { Router } = require("express");
const router = Router();
const controller = require("./../controllers/gamesController")

router.get("/", controller.gamesGetAll);

module.exports = router;