const ReviewModel = require("../Model/ReviewModel");
const catchAsync = require("../utilities/catchAsync");
exports.createReview = catchAsync(async (req, res, next) => {
  req.body.user = req.body.user || req.user;
  const review = await ReviewModel.create({
    user: req.body.user._id,
    product: req.body.product,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  res.json({
    status: "success",
    data: review,
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const data = await ReviewModel.find();
  res.json({
    status: "success",
    data,
  });
});
