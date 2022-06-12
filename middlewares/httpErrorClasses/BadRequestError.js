module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BAD REQUEST';
    this.statusCode = 400;
  }
};
