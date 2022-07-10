module.exports = class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'UNAUTHORIZED';
    this.statusCode = 401;
  }
};
