const express = require("express");
const database = require("./util/database");
const app = express();

try {
  database.authenticate();
  console.log("ok");
} catch (e) {
  console.error(e);
}
app.use((request, response, next) => {});

app.listen(3000);
