const UserModel = require("../Model/UserMode");
const catchAsync = require("../utilities/catchAsync");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utilities/Error");
const comparePassword = require("../utilities/comparePassword");
const createToken = async (id, res) => {
  const token = await JWT.sign({ id }, process.env.SecretStringForSign, {
    expiresIn: process.env.TOKEN_EXP,
  });
  res.cookie("jwt", token);
  return token;
};
exports.signUp = catchAsync(async (req, res, next) => {
  // create the user
  const user = await UserModel.create(req.body);

  // create the token
  const token = await createToken(user._id, res);

  res.status(200).json({
    status: "success",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await comparePassword(req.body.password, user.password)))
    return next(new AppError("The email or password is wrong", 401));

  await createToken(user._id, res);

  res.status(200).json({
    status: "success",
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "");
  res.json({
    status: "success",
  });
});

exports.Protect = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt)
    return next(new AppError("You are not autherized, Please Login", 401));

  const ob = JWT.verify(req.cookies.jwt, process.env.SecretStringForSign);

  // check if the user is exist and not deleted
  const user = await UserModel.findOne({ _id: ob.id });
  if (!user) next(new AppError("This user doesn't exist anymore", 401));

  // check if the password changed before this token
  //
  req.user = user;
  req.user.password = undefined;
  next();
});

exports.changePassword = catchAsync(async (req, res, next) => {
  if (!req.body.currentPassword || !req.body.newPassword)
    return next(new AppError("Please input the messing data", 401));
  if (!(await comparePassword(req.body.currentPassword, req.user.password)))
    return next(new AppError("The current password is wrong", 401));
  // create the new password
  if (req.body.currentPassword === req.body.newPassword)
    return next(
      new AppError("You can't change password to the current password", 400)
    );
  req.user.password = await bcrypt.hash(req.body.newPassword, 12);
  const newUser = await UserModel.findByIdAndUpdate(req.user._id, req.user, {
    runValidators: true,
    new: true,
  });
  res.json({
    status: "success",
    data: newUser,
  });
});

exports.restrictAdmin = catchAsync(async (req, _, next) => {
  if (!req.user.isAdmin) {
    return next(new AppError("You can't access this route", 402));
  }
  next();
});
