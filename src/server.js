const connect = require("./configs/db");
const app = require("./index");
require("dotenv").config();

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening to port no. ${port}`);
  } catch (error) {
    console.error(error);
  }
});
