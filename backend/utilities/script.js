require("./connecting");
const mongoose = require("mongoose");
const products = require("../data/products");
const ProductModel = require("../Model/ProductModel");

const deleting = async () => {
  try {
    await ProductModel.deleteMany();
    console.log("All data have been deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};
const importing = async () => {
  try {
    // const ProductsMany = [...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products,...products]
    await ProductModel.create(products);
    console.log("All data have been added successfully");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] === "--delete") deleting();
else if (process.argv[2] === "--import") importing();
