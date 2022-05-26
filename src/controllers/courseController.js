const express = require("express");

const coursesModel = require("../models/coursesModel");

const router = express.Router();
router.get("", async (req, res) => {
  try {
    const courseData = await coursesModel.find().lean().exec();
    return res.status(200).send(courseData);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
