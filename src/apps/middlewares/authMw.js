const jwt = require("jsonwebtoken")
const config = require("config")

//Sử dụng cookie
// exports.verifyAuthenticationCustomer = (req, res, next) => {
//     const { tokenCustomer } = req.cookies;
//     if (tokenCustomer) {
//         jwt.verify(
//             tokenCustomer,
//             config.get("app.jwtAccessKey"),
//                 (error, customer) => {
//                     if (error) {
//                         return res.status(401).json("Authentication fails")
//                     }
//                     next();
//                 }
//             )
//     } else {
//         return res.status(403).json("Authentication required")
//     }
// }


//Sử dụng header
exports.verifyAuthenticationCustomer = (req, res, next) => {
    const { tokencustomer } = req.headers;
    if (tokencustomer) {
        const verifyToken = tokencustomer.split(" ")[1];
        jwt.verify(
            verifyToken,
            config.get("app.jwtAccessKey"),
                (error, customer) => {
                    if (error) {
                        return res.status(401).json("Authentication fails")
                    }
                    next();
                }
            )
    } else {
        return res.status(403).json("Authentication required")
    }
}