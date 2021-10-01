const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AppError = require("./Error");

dotenv.config();

const string = process.env.connectionString
  .replace("myFirstDatabase", process.env.DatabaseName)
  .replace("<password>", process.env.DatabasePassword);
mongoose.connect(string, (e) => {
  if (mongoose.connection.readyState) console.log("connecting to the database");
  else {
    console.log(
      "Problems in connecting to the database ...shutting down the app"
    );
    process.exit();
  }
});
