//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");

// Internal Imports
const database = require("./util/database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const keepAliveRouter = require("./routes/keep_alive");
//Models Imports
const User = require("./models/user");
const Task = require("./models/task");
const {DataTypes} = require("sequelize");
dotenv.config();
const PORT = process.env.PORT ?? 3000;
const app = express();
const upload = multer();
app.use(keepAliveRouter);
app.use((request, response, next) => {
    console.log("request");
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use("/auth", authRouter);
app.use(userRouter);
User.hasMany(Task, {foreignKey: {allowNull: false}});

Task.belongsTo(User);
database
    .sync()
    .then((result) => {
        database
            .authenticate()
            .then((result) => {
                app.listen(PORT, () => {
                    console.log("server now is working on :", PORT)
                });
            })
            .catch((reason) => {
                throw reason;
            });
    })
    .catch((reason) => {
        console.error("something went wrong  ", reason);
    });
