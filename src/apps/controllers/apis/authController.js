const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("config")
const CustomerModel = require("../../models/CustomerModel")
exports.loginCustomer = async (req, res) => {
    try {
        const { body } = req;
        const customer = await CustomerModel.findOne({
            $or: [{ email: body.identifier }, { phone: body.identifier }]
        });
        if (!customer) {
            return res.status(401).json("Email not valid")
        }
        const validPassword = await bcrypt.compare(body.password, customer.password);
        if (!validPassword) {
            return res.status(401).json("password not valid")
        }
        if (customer && validPassword) {
            const accessToken = jwt.sign(
                { email: body.email, password: body.password },
                config.get("app.jwtAccessKey"),
                { expiresIn: "1d" }
            )
            res.cookie("tokenCustomer", accessToken)
            const { password, ...others } = customer._doc;
            return res.status(200).json({
                ...others,
                accessToken
            });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.register = async (req, res) => {
    try {
        const { body } = req;
        const customer = await CustomerModel.findOne({ email: body.email });
        if (customer) return res.status(401).json("Email exits")
        const isPhoneExits = await CustomerModel.findOne({ phone: body.phone })
        if(isPhoneExits) return res.status(401).json("Phone exits")
        const hashed = await bcrypt.hash(body.password, 10)

        const newCustomer = {
            email: body.email,
            password: hashed,
            full_name: body.full_name,
            address: body.address,
            phone: body.phone
        }
        await CustomerModel(newCustomer).save();
        return res.status(201).json({
            status: "success",
            messenger : "create Customer successfull"
        });
    } catch (error) {
        return res.status(500).json(error);
    }

}


