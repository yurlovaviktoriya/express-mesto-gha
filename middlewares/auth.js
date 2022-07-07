const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Требуется авторизация' });
  }
  const token = authorization.replace('Bearer', '');
  let playload;
  try {
    playload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret'
    );
  } catch (err) {
    return res.status(401).send({ message: 'Требуется авторизация' });
  }
  req.user = playload;
  next();
};
