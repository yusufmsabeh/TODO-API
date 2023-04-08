//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");

// Internal Imports
const database = require("./util/database");
const authRouter = require("./routes/auth");
//Models Imports
const User = require("./models/user");
const Task = require("./models/task");
dotenv.config();
const app = express();
const upload = multer();
app.use((request, response, next) => {
  console.log("request");
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use("/auth", authRouter);
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
