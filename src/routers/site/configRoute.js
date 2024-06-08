const router = require("express").Router();
const ConfigController = require("../../apps/controllers/apis/configController")

router.get("/configs",ConfigController.show)

module.exports = router;
