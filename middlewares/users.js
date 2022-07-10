const User = require('../models/user');

const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');

const doesUserExist = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new ResourceNotFoundError(`Запрашиваемый пользователь с id ${req.params.id} не найден`);
      }
      next();
    }).catch(next);
};

module.exports = {
  doesUserExist
};
