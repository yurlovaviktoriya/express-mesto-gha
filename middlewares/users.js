const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');

const BadRequestError = require('./httpErrorClasses/BadRequestError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');
const ConflictError = require('./httpErrorClasses/ConflictError');

const checkRequestParams = (req, res, next) => {
  Promise.resolve(req.params.id)
    .then((id) => {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestError('Сервер не может обработать ваш запрос. Неверный формат id пользователя: '
          + `в адресной строке: ${req.params.id}. Проверьте параметры URL.`);
      }
      next();
    }).catch(next);
};

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
  checkRequestParams,
  doesUserExist
};
