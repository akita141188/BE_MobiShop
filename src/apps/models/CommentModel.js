const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    prd_id: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
    },
    body: {
        type: String,
    },
    full_name: {
        type: String,
    },
    status: {
        type :Boolean,
        default: false
    }
}, {timestamps: true});


const CommentModel = mongoose.model("Comments", commentSchema, "comments");
module.exports = CommentModel;