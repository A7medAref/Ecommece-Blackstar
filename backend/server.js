const express = require("express");
const app = express();
// const path = require("path");
const ProductRouter = require("./Routes/ProductRoute");
const UserRouter = require("./Routes/UserRoutes");
const ReviewRouter = require("./Routes/ReviewRoute");
const OrderRouter = require("./Routes/OrderRoute");
const AppError = require("./utilities/Error");

const ErrorHandler = require("./utilities/ErrorHandler");
const cookieParser = require("cookie-parser");

require("./utilities/connecting");
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/review", ReviewRouter);
app.use("/api/v1/order", OrderRouter);

// const __dirName = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirName, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.send(path.resolve(__dirName, "frontend", "build", "index.html"));
//   });
// }

app.all("*", (req, _, next) => {
  next(new AppError(`we can't find ${req.originalUrl} on our server`, 404));
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("....Shutting down");
  process.exit();
});

app.use(ErrorHandler);

app.listen(5000, () => {
  console.log("the app is working on the port 5000");
});
