const express = require("express");
const multer = require("multer");
const UserRouter = express.Router();
const authController = require("../Controller/AuthController");
const UserController = require("../Controller/UserController");
const AppError = require("../utilities/Error");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) return cb(null, true);
  else return cb(new AppError("Not an image", 400));
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

UserRouter.route("/signup").post(authController.signUp);
UserRouter.route("/login").post(authController.login);
UserRouter.route("/logout").post(authController.logout);
UserRouter.route("/me").get(authController.Protect, UserController.getMe);
UserRouter.route("/changepassword").post(
  authController.Protect,
  authController.changePassword
);
UserRouter.route("/image")
  .patch(
    authController.Protect,
    upload.single("photo"),
    UserController.UploadImage
  )
  .delete(authController.Protect, UserController.deleteImage);
UserRouter.route("/cart")
  .post(authController.Protect, UserController.updateCart)
  .patch(authController.Protect, UserController.updateAllCart)
  .delete(authController.Protect, UserController.DeleteFromCart);

UserRouter.route("/admin")
  .all(authController.Protect, authController.restrictAdmin)
  .delete(UserController.deleteUser)
  .patch(UserController.makeAdmin)
  .get(UserController.GetAllUsers);

module.exports = UserRouter;
