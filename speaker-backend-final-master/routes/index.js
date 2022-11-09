const routes = require("express").Router();

routes.use("/auth", require("./auth.route"));
routes.use("/events", require("./events.route"));
routes.use("/subscription", require("./subscription.route"));

// 

const userController = require("../controllers/userController");
const bookmarksController = require("../controllers/bookmarksController");
const eventController = require("../controllers/eventController");
const paymentController = require("../controllers/paymentController");
const subscriptionHistoryController = require("../controllers/subscriptionHistoryController");
const subscriptionPlanController = require("../controllers/subscriptionPlanController");

// 

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

module.exports = routes;
