const express = require("express");
const router = express.Router();
const authController = require("../../apps/controllers/AuthController");


router.get("/admin/login", (req,res)=>{
    res.status(200).json(" login site");
router.get("/admin/register", authController.register);
router.post("/admin/store", authController.store);
router.get("/admin/success", authController.success);
router.post("/admin/login", authController.postLogin);
router.get("/admin/logout", authController.logout);
router.get("/",authController.index);

module.exports = router;
