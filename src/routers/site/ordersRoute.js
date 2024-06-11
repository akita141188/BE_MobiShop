const router = require("express").Router();
const OrderController = require("../../apps/controllers/apis/order");
router.post("/order", OrderController.order);

module.exports = router;