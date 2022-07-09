const { ObjectId } = require('mongoose').Types;

const Card = require('../models/card');
const { sendResponseWithErrorMessage } = require('./app');

const BadRequestError = require('./httpErrorClasses/BadRequestError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');

const checkRequestParams = (req, res, next) => {
  if (!ObjectId.isValid(req.params.cardId)) {
    const err = new BadRequestError('Сервер не может обработать ваш запрос. Неверный формат id карточки: '
      + `в адресной строке: ${req.params.cardId}. Проверьте параметры URL.`);
    sendResponseWithErrorMessage(res, err);
    return;
  }
  next();
};

const doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const err = new ResourceNotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
        return Promise.reject(err);
      }
      req.card = card;
      next();
    }).catch((err) => {
      sendResponseWithErrorMessage(res, err);
    });
};

const doesPermissionDelete = (req, res, next) => {
  if (ObjectId.isValid(req.card.owner) !== ObjectId.isValid(req.user._id)) {
    const err = new BadRequestError(`Автор карточки ${req.card.owner} и пользователь ${req.user._id} не совпадают`);
    sendResponseWithErrorMessage(res, err);
    return;
  }
  next();
};

module.exports = {
  checkRequestParams,
  doesCardExist,
  doesPermissionDelete
};
