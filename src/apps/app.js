const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const cartMw = require("./middlewares/cartMw")
const shareMw = require("./middlewares/shareMw")
const flash = require('express-flash');
const passport = require("passport");
require("dotenv").config();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: config.get("app.session_key"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.get("app.session_secure") }
  }))

const corsOption = {
    origin: "*" // 1 đối tượng thì đặt trong " ", nhiều [ ], "*" tất cả đều thông qua.
}

app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/assets", express.static(config.get("app.static_folder")));
app.set("views",config.get("app.views_folder"));
app.set("view engine", config.get("app.view_engine"))
app.use(config.get("app.prefixApiVersion"), require(`${__dirname}/../routers/site/web`)); // url customer site
app.use("", require(`${__dirname}/../routers/admin/web`));  // url admin site
app.use(require(`${__dirname}/../routers/site/getImagesProduct.js`))



// Sử dụng flash middleware sau session middleware
app.use(flash());

app.use(cartMw.cart)
app.use(
  shareMw.categories,
  shareMw.User,
  shareMw.cartItems,
  shareMw.formatPrice,
  shareMw.config,
  shareMw.sliders,
  shareMw.banners,
  shareMw.Customer,
  shareMw.nameProducts,
);







module.exports = app;
