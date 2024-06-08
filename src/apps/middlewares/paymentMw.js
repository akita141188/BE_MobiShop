const axios = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const crypto = require("crypto");
const config = require("config");

const paymentMw = async (req, res, next) => {
  const newOrder = res.locals.newOrder;
  console.log(newOrder);
  const paymentMethod = newOrder.payment_method;

  try {
    switch (paymentMethod) {
      case "vnpay": {
        let date = new Date();
        let createDate = moment(date).format("YYYYMMDDHHmmss");

        let ipAddr =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;

        let tmnCode = process.env.VNPAY_TMN_CODE;
        let secretKey = process.env.VNPAY_HASH_SECRET;
        let vnpUrl = process.env.VNPAY_URL;
        let returnUrl = process.env.VNPAY_RETURN_URL;

        const amount = newOrder.total_price;
        let bankCode = "";
        let locale = "vn";
        let currCode = "VND";
        var vnp_Params = {
          vnp_Version: "2.1.0",
          vnp_Command: "pay",
          vnp_TmnCode: tmnCode,
          vnp_Locale: locale,
          vnp_CurrCode: currCode,
          vnp_TxnRef: newOrder.orderId,
          vnp_OrderInfo: "Thanh toan cho ma GD:" + newOrder.orderId,
          vnp_OrderType: "other",
          vnp_Amount: amount * 100,
          vnp_ReturnUrl: returnUrl,
          vnp_IpAddr: ipAddr,
          vnp_CreateDate: createDate,
        };
        if (bankCode !== null && bankCode !== "") {
          vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let signData = require("qs").stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + require("qs").stringify(vnp_Params, { encode: false });
        return res.redirect(vnpUrl);
      }

      case "zalopay": {
        const embed_data = {
          redirecturl: process.env.ZALO_REDIRECT_URL,
        };

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
          app_id: process.env.ZALO_APP_ID,
          app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
          app_user: process.env.ZALO_USER,
          app_time: Date.now(),
          item: JSON.stringify(items),
          embed_data: JSON.stringify(embed_data),
          amount: newOrder.total_price,
          description: `Payment for the order #${newOrder.orderId}`,
          bank_code: "",
          callback_url: process.env.ZALO_CALLBACK_URL,
        };

        const data =
        process.env.ZALO_APP_ID +
          "|" +
          order.app_trans_id +
          "|" +
          order.app_user +
          "|" +
          order.amount +
          "|" +
          order.app_time +
          "|" +
          order.embed_data +
          "|" +
          order.item;
        order.mac = CryptoJS.HmacSHA256(data, process.env.ZALO_KEY1).toString();

        try {
          const result = await axios.post(process.env.ZALO_ENDPOINT, null, {
            params: order,
          });
          if (result.status === 200 && result.data.order_url) {
            return res.redirect(result.data.order_url);
          } else {
            return res.status(500).json({
              message: "Có lỗi xảy ra trong quá trình xử lý yêu cầu.",
            });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình xử lý yêu cầu.",
          });
        }
      }

      case "momo": {
        var accessKey = process.env.MOMO_ACCESS_KEY;
        var secretKey = process.env.MOMO_SECRET_KEY;
        var orderInfo = process.env.MOMO_ORDER_INFO;
        var partnerCode = process.env.MOMO_PARTNER_CODE;
        var redirectUrl = process.env.MOMO_REDIRECT_URL;
        var ipnUrl = process.env.MOMO_IP_URL;
        var requestType = process.env.MOMO_REQUEST_TYPE;
        var amount = newOrder.total_price;
        let orderId = partnerCode + new Date().getTime();
        var requestId = orderId;
        var extraData = "";
        var orderGroupId = "";
        var autoCapture = true;
        var lang = "vi";

        var rawSignature =
          "accessKey=" +
          accessKey +
          "&amount=" +
          amount +
          "&extraData=" +
          extraData +
          "&ipnUrl=" +
          ipnUrl +
          "&orderId=" +
          orderId +
          "&orderInfo=" +
          orderInfo +
          "&partnerCode=" +
          partnerCode +
          "&redirectUrl=" +
          redirectUrl +
          "&requestId=" +
          requestId +
          "&requestType=" +
          requestType;
        console.log("--------------------RAW SIGNATURE----------------");
        console.log(rawSignature);
        var signature = crypto
          .createHmac("sha256", secretKey)
          .update(rawSignature)
          .digest("hex");
        console.log("--------------------SIGNATURE----------------");
        console.log(signature);

        const requestBody = JSON.stringify({
          partnerCode: partnerCode,
          partnerName: "Test",
          storeId: "MomoTestStore",
          requestId: requestId,
          amount: amount,
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: redirectUrl,
          ipnUrl: ipnUrl,
          lang: lang,
          requestType: requestType,
          autoCapture: autoCapture,
          extraData: extraData,
          orderGroupId: orderGroupId,
          signature: signature,
        });

        const options = {
          method: "POST",
          url: "https://test-payment.momo.vn/v2/gateway/api/create",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
          },
          data: requestBody,
        };

        try {
          const result = await axios(options);
          return res.status(200).json(result.data);
        } catch (error) {
          return res.status(500).json({ statusCode: 500, message: error.message });
        }
      }

      default:
        return res.status(400).json({ message: "Phương thức thanh toán không hợp lệ" });
    }
  } catch (error) {
    next(error);
  }
};

const sortObject = (obj) => {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
};

module.exports = {
    paymentMw,
};
