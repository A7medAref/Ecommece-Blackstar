const responseSuccess = (res, data) => {
  res.json({
    status: "success",
    data,
  });
};
module.exports = responseSuccess;
