const express = require("express");
const OrderController = require("../Controller/OrderController");
const OrderRouter = express.Router();
const authController = require("../Controller/AuthController");

OrderRouter.route("/")
  .post(authController.Protect, OrderController.makeOrder)
  .get(
    authController.Protect,
    authController.restrictAdmin,
    OrderController.getOrders
  )
  .patch(
    authController.Protect,
    authController.restrictAdmin,
    OrderController.markAsDelivered
  );
OrderRouter.route("/checkout").post(
  authController.Protect,
  OrderController.checkOut
);

module.exports = OrderRouter;
