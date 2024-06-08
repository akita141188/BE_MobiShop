const mongoose = require("../../common/database")();

const customerSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      full_name: {
        type: String,
        required: [true, 'Path `full_name` is required.'],
      },
      address: {
        type: String,
        default : ""
      },
      phone: {
        type: String,
        unique: true,
      },
      socialId: {
        type: String,
        default: null,
      },
      avatar: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

const CustomerModel = mongoose.model("Customers",customerSchema,"customer");
module.exports = CustomerModel;