const ConfigModel = require("../../models/configModel")

exports.show = async (req, res) => {
    try {
        const configs = await ConfigModel.findOne()
        return res
            .status(200)
            .json({
                status: "success",
                data: {
                    docs: configs
                }
            })
    } catch (error) {
        return res.status(500).json(error);
    }
}