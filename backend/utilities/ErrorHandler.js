const AppError = require("./Error");

const handleInvalidId = (error) => {
  const message = `Invalid ${error.path}: ${error.stringValue}`;
  return new AppError(message, 500);
};

const handleDuplicate = (error) => {
  const message = `"${Object.keys(error.keyValue).join(" , ")}" is duplicated`;
  return new AppError(message, 500);
};

const handleValidators = (error) => {
  const values = Object.values(error.errors)
    .map((el) => el.message)
    .join(". ");
  const message = `Invalid input data: ${values}.`;
  return new AppError(message, 500);
};

function HandleDevelopment(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
}
function HandleProduction(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: "Something went very wrong",
    });
  }
}
function ErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") HandleDevelopment(err, res);
  else if (process.env.NODE_ENV === "production") {
    // let error = { ...err };
    if (err.name === "CastError") err = handleInvalidId(err);
    else if (err.code === 11000) err = handleDuplicate(err);
    else if (err.name === "ValidationError") err = handleValidators(err);
    else if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError"
    )
      err = new AppError("The token is invalid, please log in", 401);
    HandleProduction(err, res);
  }
}
module.exports = ErrorHandler;
