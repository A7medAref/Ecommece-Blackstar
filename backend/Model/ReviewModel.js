const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please input the id of the user who wrote that review"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: [true, "Please input the product that review is about"],
  },
  comment: {
    type: String,
    required: [true, "Please input the comment of your product"],
  },
  rating: {
    type: Number,
    required: [true, "Please input the rating of your product"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    enum: {
      values: [Date.now(), "The date is specified by the order date"],
    },
  },
});
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
