const BannerModel = require("../../models/BannerModel");

exports.show = async (req, res) => {
    try {
        const query = {};
        query.status = req.query.status || true;
        const banners = await BannerModel.find(query);
        res
            .status(200)
            .json({
                status: "success",
                filter: {
                    status: query.status
                },
                data: {
                    docs: banners,
                }
            })
    } catch (error) {
        return res.status(500).json(error);

    }
}