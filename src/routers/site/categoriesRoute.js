const router = require("express").Router();
const CategoryController = require("../../apps/controllers/apis/category")

router.get("/categories", CategoryController.index);
router.get("/categories/:id", CategoryController.show);
router.get("/categories/:id/products", CategoryController.productsCategory);

module.exports = router;