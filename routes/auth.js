const express = require("express");
const authController = require("../controllers/auth");
const Router = express.Router();

Router.post("/signup", authController.postSignup);
Router.post("/login", authController.postLogin);

module.exports = Router;
