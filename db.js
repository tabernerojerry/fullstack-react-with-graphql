const mongoose = require("mongoose");
const { config } = require("dotenv");

config({ path: "variables.env" });

const DB = mongoose
  .connect(
    process.env.MONGOOSE_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch(error => console.log("Error: ", error));

module.exports = DB;
