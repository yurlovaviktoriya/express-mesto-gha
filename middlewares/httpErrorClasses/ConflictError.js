module.exports = class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = 'CONFLICT';
    this.statusCode = 409;
  }
};
