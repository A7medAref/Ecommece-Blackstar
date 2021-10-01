const ProductModel = require("../Model/ProductModel");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/Error");
const Featured_API = require("../utilities/FeaturedApi");
const sharp = require("sharp");
const responseSuccess = require("../utilities/response");
exports.getTopThree = catchAsync(async (req, res, next) => {
  req.query.sort = "-rating";
  req.query.page = 1;
  req.query.limit = 3;
  req.query.fields = "name image price";
  next();
});
exports.getProducts = catchAsync(async (req, res, next) => {
  const clearQuery = ["sort", "limit", "page", "fields"];
  let Query = req.query;
  let query = {};
  clearQuery.forEach((e) => {
    if (req.query[e]) query[e] = req.query[e];
    delete Query[e];
  });
  let operations;
  if (Query.keyword) {
    operations = ProductModel.find({
      name: {
        $regex: Query.keyword,
        $options: "i",
      },
    }).populate({
      path: "reviews",
      select: "-user -__v -createdAt",
    });
  } else {
    operations = ProductModel.find(Query).populate({
      path: "reviews",
      select: "-user -__v -createdAt",
    });
  }
  operations = new Featured_API(query, operations)
    .sort()
    .pagination()
    .fields().operations;

  // const length
  const promises = await Promise.all([
    operations,
    ProductModel.collection.estimatedDocumentCount(),
  ]);
  res.status(200).json({
    status: "success",
    length: promises[1],
    data: promises[0],
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, category, price, countInStock, rating } = req.body;
  if (!req.file)
    return next(new AppError("The photo of the product is required", 400));
  if (req.file.size > 4194304)
    return next(new AppError("The max size for the image is 4MB", 403));

  const newProduct = await ProductModel.create({
    name,
    description,
    category,
    price,
    countInStock,
    rating,
  });

  sharp(req.file.buffer)
    .toFormat("jpeg")
    .toFile(
      process.env.NODE_ENV === "production"
        ? `frontend/build/images/product-${newProduct._id}.jpeg`
        : `frontend/public/images/product-${newProduct._id}.jpeg`
    );

  const product = await ProductModel.findByIdAndUpdate(
    newProduct._id,
    {
      image: `/images/product-${newProduct._id}.jpeg`,
    },
    { new: true }
  );

  responseSuccess(res, product);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  if (!req.body._id)
    return next(new AppError("Input the id of the product", 403));
  if (req.file) {
    if (req.file.size > 4194304)
      return next(
        new AppError(
          "The max size for the image is 4MB, The product didn't update",
          403
        )
      );

    sharp(req.file.buffer)
      .toFormat("jpeg")
      .toFile(`frontend/public/images/product-${req.body._id}.jpeg`);
    req.body.image = `/images/product-${req.body._id}.jpeg`;
  } else {
    req.body.image = undefined;
  }

  const product = await ProductModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
    runValidators: true,
  });
  responseSuccess(res, product);
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findOne({ _id: req.params._id }).populate({
    path: "reviews",
    select: "-__v",
  });
  if (!product) return res.json(null);
  responseSuccess(res, product);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await ProductModel.findByIdAndDelete(req.body._id);
  if (product === null)
    return next(new AppError("The id of that product doesn't exist", 200));
  responseSuccess(res, product);
});
