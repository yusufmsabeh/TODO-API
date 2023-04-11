const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return response.sendStatus(401);
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return response.sendStatus(401);
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(decodedToken.userId);
    if (!user) {
      return response.sendStatus(401);
    }
    request.user = user;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return response.status(401).json({
        error: {
          code: 401,
          message: "Token Expired, Please login",
        },
      });
    } else {
      return response.status(401).json({
        error: {
          code: 401,
          message: "Something went wrong, Please login ",
        },
      });
      console.error(error);
      response.sendStatus(500);
    }
  }
};
