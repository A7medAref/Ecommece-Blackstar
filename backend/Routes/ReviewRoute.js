const express = require("express");
const ReviewController = require("../Controller/ReviewController");
const ReviewRouter = express.Router();
const authController = require("../Controller/AuthController");

ReviewRouter.route("/")
  .post(authController.Protect, ReviewController.createReview)
  .get(ReviewController.getReviews);

module.exports = ReviewRouter;
