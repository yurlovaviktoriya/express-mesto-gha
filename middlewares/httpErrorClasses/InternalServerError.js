module.exports = class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'INTERNAL SERVER ERROR';
    this.statusCode = 500;
  }
};
