const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const { sendResponseWithErrorMessage } = require('./app');

const BadRequestError = require('./httpErrorClasses/BadRequestError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');

const checkRequestParams = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new BadRequestError('Сервер не может обработать ваш запрос. Неверный формат id пользователя: '
      + `в адресной строке: ${req.params.id}. Проверьте параметры URL.`);
    sendResponseWithErrorMessage(res, err);
    return;
  }
  next();
};

const doesEmailExist = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const err = new BadRequestError(`Пользователь с почтой ${email} уже существует`);
        return Promise.reject(err);
      }
      next();
    }).catch((err) => {
      sendResponseWithErrorMessage(res, err);
    });
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
    });
};

const checkUserId = (req, res, next) => {
  if (!ObjectId.isValid(req.user._id)) {
    const err = new BadRequestError('Сервер не может обработать запрос. Запрет на изменение данных: '
    + 'некорректный id');
    sendResponseWithErrorMessage(res, err);
    return;
  }
  next();
};

module.exports = {
  checkRequestParams,
  doesEmailExist,
  doesUserExist,
  checkUserId
};
