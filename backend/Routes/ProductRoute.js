const ProductController = require("../Controller/ProductController");
const authController = require("../Controller/AuthController");
const express = require("express");
const multer = require("multer");

const ProductRouter = express.Router();

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) return cb(null, true);
  else return cb(new AppError("Not an image", 400));
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

ProductRouter.route("/")
  .get(ProductController.getProducts)
  .post(
    authController.Protect,
    authController.restrictAdmin,
    upload.single("photo"),
    ProductController.createProduct
  )
  .delete(
    authController.Protect,
    authController.restrictAdmin,
    ProductController.deleteProduct
  )
  .patch(
    authController.Protect,
    authController.restrictAdmin,
    upload.single("photo"),
    ProductController.updateProduct
  );

ProductRouter.route("/:_id").get(ProductController.getProduct);

ProductRouter.route("/get/topthree").get(
  ProductController.getTopThree,
  ProductController.getProducts
);
module.exports = ProductRouter;
