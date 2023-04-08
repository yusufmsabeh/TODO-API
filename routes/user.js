const express = require("express");
const userController = require("../controllers/user");
const authorizationMiddleware = require("../middlewares/authorization");
const Router = express.Router();
Router.use(authorizationMiddleware);
Router.get("/task", userController.getTasks);
Router.post("/task", userController.postTasks);
Router.delete("/delete-task", userController.deleteTask);
module.exports = Router;