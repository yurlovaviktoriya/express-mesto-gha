const jwt = require('jsonwebtoken');

const UnauthorizedError = require('./httpErrorClasses/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      'some_dev_secret'
    );
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  req.user = payload;
  next();
};
