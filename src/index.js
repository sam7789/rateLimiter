const express = require("express");
const app = express();
const courseController = require("./controllers/courseController");
const rateLimiter = require("./middleware/rateLimiter");

app.use("/course", rateLimiter(), courseController);

module.exports = app;
