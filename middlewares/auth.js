const jwt = require('jsonwebtoken');

const UnauthorizedError = require('./httpErrorClasses/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-dev-secret'
    );
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }
  req.user = payload;
  next();
};
