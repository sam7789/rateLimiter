const express = require("express");
const app = express();
const courseController = require("./controllers/courseController");
const limiter = require("./middleware/limiter");

app.use("/course", limiter, courseController);

module.exports = app;
