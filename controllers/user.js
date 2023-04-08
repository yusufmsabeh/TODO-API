const User = require("../models/user");
exports.getTasks = async (request, response, next) => {
  try {
    const user = request.user;
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
