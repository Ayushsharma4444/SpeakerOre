const express = require("express");
const subscription = express.Router();
const subscriptionController = require("../controllers/subscriptionPlanController");
// const passport = require("passport");

const plans = [
  {
    id: 1,
    name: "Golden",
    duration: 11,
    price: 1000,
    disable: true,
    features: "This is a golden feature 1,This is a golden feature 2",
  },
  {
    id: 2,
    name: "Start Up",
    duration: 3,
    price: 2000,
    disable: true,
    features: "This is a Start feature 1,This is a Start feature 2",
  },
];

// subscription.use("/", passport.authenticate("jwt", { session: false }));

subscription.route("/").get(subscriptionController.plans);
subscription.route("/payment").post(subscriptionController.payment);
subscription.route("/update").post(subscriptionController.verifypayment);

module.exports = subscription;
