const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.default.isEmail, "Non Valid email"],
      unique: [true, "This email is already exist"],
      required: [true, "The email is required"],
    },
    password: {
      type: String,
      minlength: [8, "The min length of the password is 8 characters"],
      required: [true, "The password is required"],
    },
    name: {
      type: String,
      unique: [true, "This name is already exist"],
      required: [true, "The name is required"],
    },
    photo: String,
    isAdmin: {
      type: Boolean,
      default: false,
      enum: {
        values: [false],
      },
    },
    cart: [
      {
        name: String,
        id: mongoose.SchemaTypes.ObjectId,
        price: Number,
        amount: Number,
        image: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("orders", {
  localField: "_id",
  foreignField: "user",
  ref: "Order",
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
