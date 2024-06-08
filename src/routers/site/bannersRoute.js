const router = require("express").Router();
const BannerController = require("../../apps/controllers/apis/bannerController");

router.get("/banners",BannerController.show)

module.exports = router;