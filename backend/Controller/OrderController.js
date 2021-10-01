const Stripe = require("stripe");
const OrderModel = require("../Model/OrderModel");
const ProductModel = require("../Model/ProductModel");
const UserModel = require("../Model/UserMode");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/Error");
const Featured_API = require("../utilities/FeaturedApi");
exports.makeOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.body.user || req.user;
  if (!req.body.products)
    return next(
      new AppError("please Input the data required to make the order", 400)
    );
  // Updating the product
  const productsPromises = [];
  req.body.products.map((product) => {
    productsPromises.push(ProductModel.findById(product._id));
  });
  const AllProducts = await Promise.all(productsPromises);

  AllProducts.forEach((e, i) => {
    if (!e) return next(new AppError("one product is not exist", 400));
    else if (e.countInStock < req.body.products[i].amount)
      return next(
        new AppError(
          `The only available of ${e.name} is ${e.countInStock}`,
          402
        )
      );
  });

  const ProductsUpdated = [];
  AllProducts.forEach((e, i) => {
    ProductsUpdated.push(
      ProductModel.findByIdAndUpdate(
        e._id,
        { countInStock: e.countInStock - req.body.products[i].amount },
        { runValidators: true, new: true }
      )
    );
  });

  const Order = OrderModel.create({
    user: req.user._id,
    products: req.body.products,
  });
  const u = UserModel.findByIdAndUpdate(req.user._id, {
    cart: [],
  });

  const Promises = await Promise.all([...ProductsUpdated, u, Order]);
  res.json({
    status: "success",
    data: Promises[Promises.length - 1],
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const clearQuery = ["sort", "limit", "page", "fields"];
  let Query = req.query;
  let query = {};
  clearQuery.forEach((e) => {
    if (req.query[e]) query[e] = req.query[e];
    delete Query[e];
  });
  let operations = OrderModel.find(Query);
  operations = new Featured_API(query, operations)
    .sort()
    .pagination()
    .fields().operations;
  const Orders = await operations;
  res.json({
    status: "success",
    data: Orders,
  });
});

exports.checkOut = catchAsync(async (req, res, next) => {
  // const products = req.params.products;
  const stripe = Stripe(process.env.STRIPE_SECRET_SERVER);
  if (!req.body.token)
    return next(
      new AppError(
        "Error in the payment process please try again with a valid data",
        404
      )
    );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "AED",
    payment_method_types: ["card"],
    description: req.body.token.description,
  });
  res.json({
    status: "success",
    data: paymentIntent,
  });
});

exports.markAsDelivered = catchAsync(async (req, res, next) => {
  if (!req.body.orderId)
    return next(new AppError("Input the id of that product", 400));
  await OrderModel.findByIdAndUpdate(req.body.orderId, {
    deliveredAt: Date.now(),
  });
  res.json({
    status: "success",
  });
});
