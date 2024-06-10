const mongoose = require("../../common/database")();

const orderSchema = new mongoose.Schema({
    customer_id: {
        type : String
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
            required : false
        },
        thumbnails: [
            {
                type: String,
                required : false
            }
        ]
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
    status : {
        type : Number,
        default : 2
    }


}, { timestamps: true })
const OrderModel = mongoose.model("Orders", orderSchema, "orders");
module.exports = OrderModel;