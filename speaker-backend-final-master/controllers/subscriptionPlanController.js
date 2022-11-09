const { Op } = require("sequelize");
const SubscriptionPlan = require("../models/subscriptionPlan");
const user = require("../models/user");
const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports.plans = (req, res) => {
  SubscriptionPlan.findAll({
    raw: true,
  })
    .then((plans) => {
      return res.status(200).json(plans);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.payment = (req, res) => {
  const planId = req.body.id;
  //   find plan by id
  SubscriptionPlan.findOne({
    where: {
      id: planId,
    },
    raw: true,
  })
    .then((plan) => {
      if (!plan) {
        return res.status(400).json({
          success: false,
          message: "Plan not found",
        });
      }
      try {
        const instance = new Razorpay({
          key_id: process.env.KEY_ID,
          key_secret: process.env.KEY_SECRET,
        });

        const options = {
          amount: req.body.amount * 100,
          currency: "INR",
          receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: error });
          }
          res.status(200).json({ data: order });
        });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    });
};

module.exports.verifypayment = (req, res) => {
  const planId = req.body.planId;
  const userId = req.body.userId;

  //   find user by id
  user
    .findOne({
      where: {
        id: userId,
      },
      raw: true,
    })
    .then((userD) => {
      if (!userD) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      //   update isSubscribed to true
      user.update(
        {
          subscribed: 1,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Subscription Successful",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    });
};
