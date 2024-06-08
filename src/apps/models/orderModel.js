const mongoose = require("../../common/database")();

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Customers',
    },
    orderId: {
        type : String,
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        default: 0,
    },
    items: [{
        prd_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true
        },
        qty: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
        }
    }],
    confirmed: {
        type: Boolean,
        default: false
    },
    payment_method: {
        type: String,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },


}, { timestamps: true })
const OrderModel = mongoose.model("Orders", orderSchema, "orders");
module.exports = OrderModel;