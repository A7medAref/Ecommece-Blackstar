const AppError = require("./Error");

class Featured_API {
  constructor(query, operations) {
    this.query = query;
    this.operations = operations;
  }
  sort() {
    if (this.query.sort) {
      this.query.sort = this.query.sort.replace(",", " ");
      this.operations.sort(this.query.sort);
    }
    return this;
  }
  pagination() {
    this.query.page = this.query.page || 1;
    this.query.limit = this.query.limit || 15;

    if (this.query.page <= 0 || this.query.limit < 0)
      next(new AppError("Invalid page or limit"));
    this.operations = this.operations
      .skip((this.query.page - 1) * this.query.limit)
      .limit(this.query.limit * 1);
    return this;
  }
  fields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(",").join(" ");
      this.operations = this.operations.select(fields);
    }
    return this;
  }
}
module.exports = Featured_API;
