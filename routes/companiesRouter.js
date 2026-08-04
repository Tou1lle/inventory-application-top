const { Router } = require("express");
const controller = require("./../controllers/companiesController")
const router = Router();


router.get("/", controller.companiesGet);
router.get("/:id", controller.companyGet);

module.exports = router;