const router = require("express").Router();
const AuthController = require("../../apps/controllers/apis/authController")
const CustomerController = require("../../apps/controllers/apis/customerController")
const OrderController = require("../../apps/controllers/apis/order")
const authMw = require("../../apps/middlewares/authMw")


router.post("/customer/login",AuthController.loginCustomer)
router.get("/customer/test",authMw.verifyAuthenticationCustomer,(req,res)=>{
    res.json("hi")
})
router.post("/customer/register",AuthController.register)
router.post("/customer/update",CustomerController.update)
router.get("/customer/:id/orders", authMw.verifyAuthenticationCustomer, OrderController.ordersCutomer)
router.get("/customer/order/:id", authMw.verifyAuthenticationCustomer, OrderController.orderDetails)
module.exports = router;