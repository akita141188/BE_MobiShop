const mongoose = require("../../common/database")();

const categorySchema = new mongoose.Schema({
    description: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    parent_id:{
        type : String,
        default : "",
    }
},{
        timestamps: true,
});

const CategoryModel = mongoose.model("Categories", categorySchema, "categories");
module.exports = CategoryModel;