const router = require("express").Router();
const SliderController = require("../../apps/controllers/apis/sliderController");

router.get("/sliders", SliderController.show)

module.exports = router;
