const bcrypt = require("bcryptjs");

const comparePassword = async function (password, bcryptedPassword) {
  return await bcrypt.compare(password, bcryptedPassword);
};
module.exports = comparePassword;
