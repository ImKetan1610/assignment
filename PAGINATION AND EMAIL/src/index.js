const express = require("express");
const connect = require("./configs/db");
const usersController = require("./controllers/users.controllers");

const app = express();

app.use(express.json());

app.use("/users", usersController);


app.listen(5000, async function () {
  await connect();
  console.log("listening on port 5000");
});