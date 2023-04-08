//External Imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

// Internal Imports
const database = require("./util/database");
const app = express();
const upload = multer();
app.use(express.json);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
try {
  database.authenticate();
  console.log("ok");
} catch (e) {
  console.error(e);
}

app.listen(3000);
