module.exports = class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RESOURCE NOT FOUND';
    this.statusCode = 404;
  }
};
