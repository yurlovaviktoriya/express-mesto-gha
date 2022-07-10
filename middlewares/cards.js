const Card = require('../models/card');

const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');
const ForbiddenError = require('./httpErrorClasses/ForbiddenError');

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
      if (!(String(cardOwner) === String(userId))) {
        throw new ForbiddenError('Нельзя удалять чужую карточку. '
          + `Автор карточки ${cardOwner} и пользователь ${userId} не совпадают`);
      }
      next();
    }).catch(next);
};

module.exports = {
  doesCardExist,
  doesPermissionDelete
};
