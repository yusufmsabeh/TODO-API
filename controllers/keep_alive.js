exports.getKeepAlive = async (request, response, next) => {
  try {
    response.status(200).send("I am A live");
    console.log("I am A live  ", new Date());
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
