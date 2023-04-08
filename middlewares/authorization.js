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
    request.user = user;
    next();
  } catch (error) {
    console.error(error);
    response.setStatus(500);
  }
};
