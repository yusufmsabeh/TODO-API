exports.getKeepAlive = async (request, response, next) => {
  try {
    response.status(200).send("I am A live");
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
};
