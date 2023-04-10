const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Task = sequelize.define("Task", {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_done:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  }
});

module.exports = Task;
