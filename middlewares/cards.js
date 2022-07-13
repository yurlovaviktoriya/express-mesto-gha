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
  if (!(String(req.card.owner) === String(req.user._id))) {
    throw new ForbiddenError('Нельзя удалять чужую карточку. '
      + `Автор карточки ${req.card.owner} и пользователь ${req.user._id} не совпадают`);
  }
  next();
};

module.exports = {
  doesCardExist,
  doesPermissionDelete
};
