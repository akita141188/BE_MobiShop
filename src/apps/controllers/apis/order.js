const OrderModel = require("../../models/orderModel");
const ProductModel = require("../../models/productModel");
const transporter = require("../../../libs/mail");
const pagination = require("../../../libs/pagination")
const _ = require("lodash");
const ejs = require("ejs");
const path = require("path");
exports.order = async (req, res) => {
    const { body } = req;
    let totalPrice = 0;
    totalPrice = body.items.reduce((total, item) => total + item.qty * item.price, 0);
    const order = {
        customer_id: body._id,
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        total_price: totalPrice,
        items: body.items,
    };
    await OrderModel(order).save();
    const idsPrd = body.items.map((item) => item.prd_id);
    const products = await ProductModel.find({ _id: { $in: idsPrd } }).lean();
    let items = [];
    for (let prd of products) {
        const cart = _.find(body.items, {
            prd_id: prd._id.toString()
        });
        if (cart) {
            cart.name = prd.name;
            cart.price = prd.price;
            items.push(cart);
        }
    }
    const html = await ejs.renderFile(path.join(req.app.get("views"), "mail.ejs"), {
        full_name: body.full_name,
        phone: body.phone,
        address: body.address,
        total_price: totalPrice,
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

exports.ordersCutomer = async (req, res) => {
    try {
        const query = {};
        const {id} = req.params;
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const skip = page * limit - limit;
        query.customer_id = id
        const orders = await OrderModel
            .find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
        return res
            .status(200)
            .json({
                status: "success",
                filter: {
                    page,
                    limit,
                },
                data: {
                    docs: orders,
                    pages: await pagination(OrderModel, query, page, limit)
                }
            })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.orderDetails = async (req,res)=>{
    try {
        const {id} = req.params;
        const order = await OrderModel.findById(id);
        const {items} = order;

        const prdsId = items.map((item)=> item.prd_id)
        const products = await ProductModel.find({_id : {$in : prdsId}}).lean();
        let newItems = [];
        for(let product of products){
            const obj = _.find(items,{
                prd_id : product._id
            })
            if(obj){
                obj.name = product.name,
                obj.thumbnails = product.thumbnails,
                newItems.push(obj)
            }
        }
        return res.status(200).json({newItems})
    } catch (error) {
        return res.status(500).json(error)
    }
}

