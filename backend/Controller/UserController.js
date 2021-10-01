const sharp = require("sharp");
const UserModel = require("../Model/UserMode");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/Error");
const fs = require("fs");
const Featured_API = require("../utilities/FeaturedApi");

exports.getMe = catchAsync(async (req, res, next) => {
  req.body.user = req.body.user || req.user;
  let allUserInfo = await UserModel.findById(req.body.user._id).populate({
    path: "orders",
    select: "orderedAt products deliveredAt -user",
  });
  allUserInfo.password = undefined;
  res.json({
    status: "success",
    data: allUserInfo,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  if (!req.body.product)
    return next(new AppError("send the date of the product to add it", 404));
  const { name, _id, price, amount, image } = req.body.product;
  if (!name || !_id || !price || !amount || !image)
    return next(new AppError("send the date of the product to add it", 404));

  const cart = req.user.cart;
  const index = cart.findIndex((e, i) => e._id.toString() === _id);
  let user;

  if (index === -1) {
    user = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        cart: [
          ...cart,
          { name: name, _id: _id, price: price, amount: amount, image: image },
        ],
      },
      { new: true }
    );
  } else {
    cart[index] = {
      name: name,
      _id: _id,
      price: price,
      amount: amount,
      image: image,
    };
    user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { cart },
      { new: true }
    );
  }

  res.json({
    status: "success",
    data: user.cart,
  });
});

exports.updateAllCart = catchAsync(async (req, res, next) => {
  if (!req.body.cart) return next(new AppError("Input the edited cart", 404));

  const newCart = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      cart: req.body.cart,
    },
    { new: true }
  );

  res.json({
    status: "success",
    data: newCart,
  });
});

exports.DeleteFromCart = catchAsync(async (req, res, next) => {
  if (!req.body.product) return next(new AppError("Input the product Id", 400));
  const index = req.user.cart.findIndex(
    (e) => e._id.toString() === req.body.product
  );
  if (index === -1)
    return next(new AppError("That product doesn't exist in the cart", 400));
  const newCart = [...req.user.cart];
  newCart.splice(index, 1);
  await UserModel.findByIdAndUpdate(req.user._id, {
    cart: newCart,
  });
  res.json({
    status: "success",
    data: newCart,
  });
});

exports.UploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("You didn't submit any photo", 400));

  if (req.file.size > 4194304)
    return next(new AppError("The max size for the image is 4MB", 403));

  const img = sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat("jpeg")
    .toFile(
      process.env.NODE_ENV === "production"
        ? `frontend/build/images/profile-${req.user._id}.jpeg`
        : `frontend/public/images/profile-${req.user._id}.jpeg`
    );

  const user = UserModel.findByIdAndUpdate(
    req.user._id,
    {
      photo: `/images/profile-${req.user._id}.jpeg`,
    },
    {
      new: true,
    }
  );
  const promises = await Promise.all([user, img]);

  res.json({
    status: "success",
    promises,
  });
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const deleteImage = await fs.unlinkSync(
    `frontend/public/images/profile-${req.user._id}.jpeg`
  );
  res.json({
    status: "success",
    deleteImage,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (!req.body.userId)
    return next(new AppError("The id of the user is missing", 404));
  const deletedUser = await UserModel.findById(req.body.userId);
  if (!deletedUser) return next(new AppError("That user doesn't exist", 404));
  if (deletedUser.isAdmin) {
    return next(
      new AppError(
        "The admin can't delete another admin only allowable from the database",
        400
      )
    );
  }
  await UserModel.findByIdAndDelete(deletedUser._id);
  res.json({
    status: "success",
  });
});

exports.makeAdmin = catchAsync(async (req, res, next) => {
  if (!req.body.userId)
    return next(new AppError("The id of the user is missing", 404));
  const UpdatedAdmin = await UserModel.findByIdAndUpdate(req.body.userId, {
    isAdmin: true,
  });
  if (!UpdatedAdmin) return next(new AppError("That user doesn't exist", 404));

  res.json({
    status: "success",
  });
});

exports.GetAllUsers = catchAsync(async (req, res, next) => {
  const clearQuery = ["sort", "limit", "page", "fields"];
  // console.log(req.query);
  let Query = req.query;
  let query = {};
  clearQuery.forEach((e) => {
    if (req.query[e]) query[e] = req.query[e];
    delete Query[e];
  });
  let operations = UserModel.find(Query);

  operations = new Featured_API(query, operations)
    .sort()
    .pagination()
    .fields().operations;
  const users = await operations;
  res.json({
    status: "success",
    data: users,
  });
});
