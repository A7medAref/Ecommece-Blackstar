const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please input the id of the user who ordered this order"],
    ref: "User",
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: "The id of the product is required",
      },
      amount: {
        type: Number,
        min: [0, "To order a product the min amount is 1"],
        required: "The amount of the product is required",
      },
    },
  ],
  orderedAt: {
    type: Date,
    default: Date.now(),
    enum: {
      values: [Date.now(), "The date is specified by the order date"],
    },
  },
  deliveredAt: { type: Date },
});
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
