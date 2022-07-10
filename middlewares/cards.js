const { ObjectId } = require('mongoose').Types;

const Card = require('../models/card');

const BadRequestError = require('./httpErrorClasses/BadRequestError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');
const ForbiddenError = require('./httpErrorClasses/ForbiddenError');

const checkRequestParams = (req, res, next) => {
  Promise.resolve(req.params.cardId)
    .then((id) => {
      if (!ObjectId.isValid(id)) {
        throw new BadRequestError('Сервер не может обработать ваш запрос. Неверный формат id карточки: '
        + `в адресной строке: ${req.params.cardId}. Проверьте параметры URL.`);
      }
      next();
    }).catch(next);
};

const doesCardExist = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ResourceNotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
      }
      req.card = card;
      next();
    }).catch(next);
};

const doesPermissionDelete = (req, res, next) => {
  Promise.resolve({ cardOwner: req.card.owner, userId: req.user._id })
    .then((data) => {
      const { cardOwner, userId } = data;
      if (ObjectId.isValid(cardOwner) !== ObjectId.isValid(userId)) {
        throw new ForbiddenError('Нельзя удалять чужую карточку. '
          + `Автор карточки ${cardOwner} и пользователь ${userId} не совпадают`);
      }
      next();
    }).catch(next);
};

module.exports = {
  checkRequestParams,
  doesCardExist,
  doesPermissionDelete
};
