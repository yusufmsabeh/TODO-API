const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.postSignup = async (request, response, next) => {
  try {
    const { name, email, password, confirmPassword } = request.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();
    await User.create({
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
    });
    response.status(200).json({
      code: "200",
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
};

exports.postLogin = async (request, response, next) => {
  try {
    const { email, password } = request.body;

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
      process.env["ACCESS_TOKEN_SECRET"],
      {
        expiresIn: "30d",
      }
    );

    response.status(200).json({
      code: 200,
      message: "Logged in successfully",
      user: { name: user.name, email: user.email, token: token },
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
