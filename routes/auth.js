const { request } = require("express");
const { response } = require("express");
const express = require("express");
const { body, sanitizeBody, validationResult } = require("express-validator");
const authController = require("../controllers/auth");
const errorController = require("../controllers/error");
const Router = express.Router();
Router.use(
  [
    sanitizeBody("*").trim(),
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Enter A valid Email please "),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password cannot be less then 8"),
  ],
  errorController.handleErrors
);
Router.post("/signup", authController.postSignup);
Router.post("/login", authController.postLogin);

module.exports = Router;
