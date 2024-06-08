const SliderModel = require("../../models/SliderModel")

exports.show = async (req,res)=>{
    const query = {};
    query.status = req.query.status || true;
    const sliders = await SliderModel.find(query);
    res
    .status(200)
    .json({
        status: "success",
        filter : {
            status : query.status
        },
        data : {
            docs: sliders,
        }
    })
}