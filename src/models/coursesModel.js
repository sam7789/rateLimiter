const mongoose = require("mongoose");

//!  creating course schema
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: false },
    table: [{ type: String, required: false }],
    by: { type: String, required: true },
    rating: { type: Number, required: true },
    level: { type: String, required: true },
    time: { type: String, required: true },
    shortDiscription: { type: String, required: true },
    discription: { type: String, required: true },
    Author_Image_URL: { type: String, required: true },
    author_about: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Courses", courseSchema);
