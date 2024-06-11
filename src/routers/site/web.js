const express = require("express");
const router = express.Router();

const CategoriesRoute = require("./categoriesRoute")
const ProductsRoute = require("./productsRoute")
const CustomerRoute = require("./customersRoute")
const SlidersRoute = require("./slidersRoute")
const BannersRoute = require("./bannersRoute")
const ConfigsRoute = require("./configRoute")
const OrderRoute = require("./ordersRoute")

router.use("",CategoriesRoute)
router.use("",ProductsRoute)
router.use("",CustomerRoute)
router.use("",SlidersRoute)
router.use("",BannersRoute)
router.use("",ConfigsRoute)
router.use("",OrderRoute)






module.exports = router;