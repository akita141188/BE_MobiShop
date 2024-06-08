const router = require("express").Router();
const ProductController = require("../../apps/controllers/apis/product");

router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.get("/products/:id/comments", ProductController.comments)
router.post("/products/:id/comments", ProductController.storeComments);

module.exports = router;