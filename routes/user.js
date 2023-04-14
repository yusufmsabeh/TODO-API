const express = require("express");
const {
  sanitizeBody,
  sanitizeQuery,
  body,
  query,
} = require("express-validator");
const userController = require("../controllers/user");
const authorizationMiddleware = require("../middlewares/authorization");
const errorController = require("../controllers/error");
const Task = require("../models/task");
const Router = express.Router();
Router.use(authorizationMiddleware);
Router.use([sanitizeBody("*").trim(), sanitizeQuery("*").trim()]);
Router.get("/tasks", userController.getTasks);
Router.get("/tasks", userController.getSearch);
Router.post(
  "/tasks",
  [
    body("title").notEmpty().withMessage("Title required"),
    body("description").notEmpty().withMessage("Description required"),
    errorController.handleErrors,
  ],
  userController.postTasks
);
Router.put(
  "/tasks",
  [
    body("title").notEmpty().withMessage("Title required"),
    body("description").notEmpty().withMessage("Description required"),
    query("taskId")
      .notEmpty()
      .withMessage("taskId required")
      .custom((value) => {
        return Task.findByPk(value).then((task) => {
          if (!task) return Promise.reject("There is no task with this id");
        });
      }),
    errorController.handleErrors,
  ],
  userController.putUpdateTask
);
Router.get("/tasks-count", userController.getTasksCount);
Router.use(
  query("taskId")
    .notEmpty()
    .withMessage("taskId required")
    .custom((value) => {
      return Task.findByPk(value).then((task) => {
        if (!task) return Promise.reject("There is no task with id");
      });
    }),
  errorController.handleErrors
);
Router.delete("/tasks", userController.deleteTask);
Router.post("/task-status", userController.postDoneTask);
module.exports = Router;
