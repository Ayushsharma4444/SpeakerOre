const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const passport = require("passport");

require("../config/passport");

module.exports = function (app) {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json());
  app.use(passport.initialize());

  // all routes are defined here

  app.get("/", (req, res) => {
    res.send("Welcome !!");
  });

  //  Connect all our routes to our application
  app.use("/api/v1", routes);

  // Error Handler
  app.use((err, req, res, next) => {
    res.status(500).json({
      success: false,
      message: "error occured, see the errMessage key for more details",
      errorMessage: err.message,
    });
  });
};
