const express = require("express");
const auth = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

auth.route("/login").post(userController.login);
auth.route("/update/:id").put(userController.update);
auth.route("/makemod").post(userController.makeMod);
auth.route("/maketeam").post(userController.makeTeam);
auth.route("/makeuser").post(userController.makeUser);
auth.route("/users").get(userController.allUsers);

module.exports = auth;
