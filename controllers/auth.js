const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.postSignup = async (request, response, next) => {
  try {
    const { name, email, password, confirmPassword } = request.body;
    if (!(name && email && password && confirmPassword)) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "All fields required",
        },
      });
    }
    if (password != confirmPassword) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "Password does not match!",
        },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();
    await User.create({
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
    });
    response.sendStatus(200);
  } catch (error) {
    console.log(error.parent.errno == 19);
    if (error.parent.errno == 19)
      return response.status(400).json({
        error: {
          code: 400,
          message: "Email Exists",
        },
      });
    response.sendStatus(500);
  }
};

exports.postLogin = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!(email && password)) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "All fields required",
        },
      });
    }
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "email or password wrong",
        },
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "email or password wrong",
        },
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env['ACCESS_TOKEN_SECRET'],
      {
        expiresIn: "30d",
      }
    );

    response.status(200).json({
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
};
