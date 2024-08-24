const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AppError = require("./Error");
const productsData = require("../data/products");
const ProductModel = require("../Model/ProductModel");
dotenv.config();

const string = process.env.connectionString;
mongoose.connect(string, async (e) => {
  if (mongoose.connection.readyState) {
    console.log("connecting to the database");
    // Check if there is any products in the database
    if ((await ProductModel.countDocuments()) === 0) {
      console.log("No products in the database");
      console.log("Adding products to the database");
      await ProductModel.insertMany(productsData);
      console.log("Products added successfully");
    }
  } else {
    console.log(
      "Problems in connecting to the database ...shutting down the app"
    );
    process.exit();
  }
});
