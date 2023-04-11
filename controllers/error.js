const { validationResult } = require("express-validator");

exports.handleErrors = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({
        error: {
          code: 422,
          message: errors.array()[0].msg,
        },
      });
    }
    next();
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
