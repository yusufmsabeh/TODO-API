const User = require("../models/user");
const Task = require("../models/task");
const crypto = require("crypto");
const { Op } = require("sequelize");
exports.getTasks = async (request, response, next) => {
  try {
    const user = request.user;
    if (request.query.q) return next();

    const tasks = await user.getTasks({
      attributes: ["id", "title", "description", "is_done"],
    });
    response.status(200).json({ code: 200, tasks: tasks });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.postTasks = async (request, response, next) => {
  try {
    const { title, description } = request.body;
    const user = request.user;
    const taskId = crypto.randomUUID();
    await user.createTask({
      id: taskId,
      title: title,
      description: description,
    });
    response.status(200).json({
      code: 200,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.deleteTask = async (request, response, next) => {
  try {
    const taskId = request.query.taskId;
    await Task.destroy({
      where: {
        id: taskId,
        userId: request.user.id,
      },
    });

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

exports.getSearch = async (request, response, next) => {
  try {
    const searchQuery = request.query.q;
    const user = request.user;
    const tasks = await user.getTasks({
      attributes: ["id", "title", "description", "is_done"],
      where: {
        title: { [Op.like]: `%${searchQuery}%` },
      },
    });
    response.status(200).json({
      code: 200,
      tasks: tasks,
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.postDoneTask = async (request, response, next) => {
  try {
    const user = request.user;
    const taskId = request.query.taskId;
    const task = await Task.findOne({
      where: {
        [Op.and]: [{ id: taskId }, { userId: user.id }],
      },
    });
    task.is_done = !task.is_done;
    await task.save();
    response.status(200).json({
      code: 200,
      message: `Task Status Changed to ${task.is_done}`,
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};

exports.putUpdateTask = async (request, response, next) => {
  try {
    const taskId = request.query.taskId;

    const { title, description } = request.body;
    await Task.update(
      { title: title, description: description },
      { where: { id: taskId, userId: request.user.id } }
    );

    response.status(200).json({
      code: 200,
      message: `Task update successfully`,
    });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
