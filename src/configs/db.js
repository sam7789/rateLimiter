const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
