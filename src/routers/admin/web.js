const express = require("express");
const router = express.Router();

//admin router
const AdminAuthRoute = require("../admin/AuthRouter")
const AdminUsersRoute = require("./usersRoute")
const AdminProductsRoute = require("./productRoute")
const AdminCategoriesRoute = require("./categoriesRoute")
const AdminCommentsRoute = require("./commentsRoute")
const AdminCustomersRoute = require("./customerRoute")
const AdminSlidersRoute = require("./slidersRoute")
const AdminBannersRoute = require("./bannerRoute")
const AdminOrdersRoute = require("./orderRoute")
const AdminConfigsRoute = require("./configRoute")
const AdminTrashRoute = require("./recycleBinRoute")
const AdminRootRoute = require("./RootRoute")
const AdminSocialRoute = require("./socialRoute")

router.use("",AdminAuthRoute)
router.use("",AdminUsersRoute)
router.use("",AdminProductsRoute)
router.use("",AdminCategoriesRoute)
router.use("",AdminCommentsRoute)
router.use("",AdminCustomersRoute)
router.use("",AdminSlidersRoute)
router.use("",AdminBannersRoute)
router.use("",AdminOrdersRoute)
router.use("",AdminConfigsRoute)
router.use("",AdminTrashRoute)
router.use("",AdminRootRoute)
router.use("",AdminSocialRoute)






module.exports = router;