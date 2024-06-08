const OrderModel = require("../../models/orderModel");
const ProductModel = require("../../models/productModel");
const transporter = require("../../../libs/mail");
const _ = require("lodash");
const ejs = require("ejs");
const path = require("path");
exports.order = async (req, res)=>{
    const {body} = req;
    let totalPrice = 0;
    totalPrice = body.items.reduce((total, item)=>total + item.qty*item.price, 0);
    const order = {
        full_name: body.full_name,
        email: body.email,
        phone: body.phone, 
        address: body.address,
        total_price : totalPrice,
        items: body.items,
    };
    await OrderModel(order).save();
    console.log(order);
    const idsPrd = body.items.map((item)=>item.prd_id);
    const products = await ProductModel.find({_id: {$in: idsPrd}}).lean();
    let items = [];
    for(let prd of products){
        const cart = _.find(body.items, {
            prd_id: prd._id.toString()
        });
        if(cart){
            cart.name = prd.name;
            cart.price = prd.price;
            items.push(cart);
        }
    } 
    const html = await ejs.renderFile(path.join(req.app.get("views"), "mail.ejs"), {
        full_name: body.full_name,
        phone: body.phone,
        address: body.address,
        total_price : totalPrice,
        items,
    });
    await transporter.sendMail({
        from: '"Vietpro Shop" <quantri.vietproshop@gmail.com>',
        to: `${body.email}`,
        subject: "Xác nhận đơn hàng từ Vietpro Store",
        html,
    });

    res 
        .status(201).json({
            status: "success",
            message: "Create order successfully",
        });
}