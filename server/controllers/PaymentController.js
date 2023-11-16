const {User, MusicKit, Order} = require("../models");
const midtransClient = require('midtrans-client');
let nanoid;

import("nanoid")
  .then((module) => {
    nanoid = module.nanoid;
  })
  .catch((error) => {
    console.error("Failed to import nanoid:", error);
  });

class PaymentController {
    static async getMidtransToken(req, res, next) {
        try {
            const musicId = req.params.id
            const userId = req.user.id

            const musicKit = await MusicKit.findByPk(musicId)
            const user = await User.findByPk(userId)
            if(!musicKit) {
                throw {name: "Data not found"}
            }
            const snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
            
            const orderId = `trx-purchase-${nanoid()}`

            await Order.create({
                orderId,
                UserId: req.user.id,
                MusicId: musicKit.id,
                amount: musicKit.price, 
                status: "pending"
            })

            const parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": musicKit.price
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": user.email
                }
            };

            const { token } = await snap.createTransaction(parameter)
            res.status(201).json({transaction_token: token, orderId})
        } catch(err) {
            next(err)
        }
    }
}

module.exports = PaymentController