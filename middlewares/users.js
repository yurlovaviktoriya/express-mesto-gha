const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/user');
const { sendResponseWithErrorMessage } = require('./app');

const InternalServerError = require('./httpErrorClasses/InternalServerError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');

const checkRequestParams = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new InternalServerError('Сервер не может обработать ваш запрос. Неверный формат id пользователя: ' +
      `в адресной строке: ${req.params.id}. Проверьте параметры URL.`);
    sendResponseWithErrorMessage(res, err);
    return;
  }
  next();
};

const doesUserExist = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const err = new ResourceNotFoundError(`Запрашиваемый пользователь с id ${req.params.id} не найден`);
        return Promise.reject(err);
      }
      next();
    }).catch((err) => {
      sendResponseWithErrorMessage(res, err);
  })
};

module.exports = {
  checkRequestParams,
  doesUserExist
};
