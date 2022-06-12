const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/user');
const Card = require('../models/card');

const BadRequestError = require('./httpErrorClasses/BadRequestError');
const InternalServerError = require('./httpErrorClasses/InternalServerError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');


const sendResponseWithErrorMessage = (res, err) => {
  res.status(err.statusCode).send({
    message: `Ошибка: ${err.statusCode}.${err.name}. ${err.message}`
  });
}


const checkRequestParams = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    const err = new InternalServerError('Сервер не может обработать ваш запрос. Проверьте параметры URL.');
    sendResponseWithErrorMessage(res, err);
    return;
  }
  next();
}

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
}

const doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const err = new ResourceNotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
        return Promise.reject(err);
      }
      next();
    }).catch((err) => {
      sendResponseWithErrorMessage(res, err);
  })
}


const isDbErrors = (res, err) => {
  if ('errors' in err) {
    const error = new BadRequestError(`Переданы некорректные данные для полей ${Object.keys(err.errors)}. ` +
    `Сервер не может обработать ваш запрос. Сообщение сервера: ${err.message}`);
    sendResponseWithErrorMessage(res, error);
  } else {
    const error = new InternalServerError('На сервере произошла ошибка. Проверьте URL, корректность данных и ' +
      'повторите запрос. Если ошибка не исчезла, попробуйте обратиться позже');
    sendResponseWithErrorMessage(res, error);
  }
}

module.exports = {
  checkRequestParams,
  doesUserExist,
  doesCardExist,
  isDbErrors
}
