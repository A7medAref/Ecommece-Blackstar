const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input the name of the product"],
      minlength: [2, "The minimum length for the name is 2 characters"],
      // maxlength: [30, "The maximum length for the name is 30 characters"],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "please input a Description for your product"],
    },
    category: {
      type: String,
      required: [true, "please input the categori of your product"],
    },
    price: {
      type: Number,
      required: [true, "please input the price of your product"],
    },
    countInStock: {
      type: Number,
      required: [true, "please input the count in stock of your product"],
      min: [0, "The min value is 0"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ProductsSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

const ProductModel = mongoose.model("Products", ProductsSchema);
module.exports = ProductModel;
