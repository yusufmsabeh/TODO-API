//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

// Internal Imports
const database = require("./util/database");

//Models Imports
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const upload = multer();
app.use(express.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Database Relations
User.hasMany(Task);
Task.belongsTo(User, {
  constrains: true,
});
database
  .sync()
  .then((result) => {
    database
      .authenticate()
      .then((result) => {
        app.listen(3000);
        console.log("server now is working :  ", result);
      })
      .catch((reason) => {
        throw reason;
      });
  })
  .catch((reason) => {
    console.error("something went wrong  ", reason);
  });
