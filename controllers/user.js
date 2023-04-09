const User = require("../models/user");
const Task = require("../models/task");
const crypto = require("crypto");
exports.getTasks = async (request, response, next) => {
  try {
    const user = request.user;
    const tasks = await user.getTasks();
    response.status(200).json({ code: 200, tasks: tasks });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.postTasks = async (request, response, next) => {
  try {
    const { title, description } = request.body;
    console.log(title, description);
    if (!(title && description)) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "All fields required",
        },
      });
    }
    const user = request.user;
    const taskId = crypto.randomUUID();
    await user.createTask({
      id: taskId,
      title: title,
      description: description,
    });
    response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.deleteTask = async (request, response, next) => {
  try {
    const taskId = request.query.taskId;
    console.log(taskId);
    if (!taskId) {
      return response.status(400).json({
        error: {
          code: 400,
          message: "task id required",
        },
      });
    }
    const effectedRows = await Task.destroy({
      where: {
        id: taskId,
      },
    });
    if (effectedRows == 0) {
      return response.status(400).json({
        code: 400,
        message: "there is no task with this id",
      });
    }
    response.status(202).json({
      code: 202,
      message: "task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.getTasksCount = async (request, response, next) => {
  try {
    const user = request.user;
    const tasksCount = await user.countTasks();
    response.status(200).json({
      code: 200,
      TasksCount: tasksCount,
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
