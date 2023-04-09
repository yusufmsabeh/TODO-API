const express = require("express");
const keepAliveController = require("../controllers/keep_alive");
const Router = express.Router();

Router.use("/keep-alive", keepAliveController.getKeepAlive);

module.exports = Router;
