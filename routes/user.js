const express = require("express");
const { sanitizeBody, sanitizeQuery } = require("express-validator");
const userController = require("../controllers/user");
const authorizationMiddleware = require("../middlewares/authorization");
const Router = express.Router();
Router.use(authorizationMiddleware);
Router.get(
  "/tasks",
  sanitizeBody("*").trim(),
  sanitizeQuery("*").trim(),
  userController.getTasks
);
Router.get("/tasks", userController.getSearch);
Router.post("/tasks", userController.postTasks);
Router.put("/tasks", userController.putUpdateTask);
Router.delete("/tasks", userController.deleteTask);
Router.get("/tasks-count", userController.getTasksCount);
Router.post("/task-status", userController.postDoneTask);
module.exports = Router;
