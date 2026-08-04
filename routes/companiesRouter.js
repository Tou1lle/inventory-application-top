const { Router } = require("express");
const controller = require("./../controllers/companiesController")
const router = Router();


router.get("/", controller.companiesGetAll);

module.exports = router;