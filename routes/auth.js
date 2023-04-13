const { request } = require("express");
const { response } = require("express");
const express = require("express");
const { body, sanitizeBody, validationResult } = require("express-validator");
const User = require("../models/user");
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
Router.post(
  "/signup",
  [
    body("password").custom((value, { req }) => {
      if (value != req.body.confirmPassword)
        throw new Error("Password does not match");
    }),
    body("email").custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) return Promise.reject("E-mail Exists ");
      });
    }),

    errorController.handleErrors,
  ],
  authController.postSignup
);
Router.post("/login", authController.postLogin);

module.exports = Router;
