const router = require('express').Router();

const { doesCardExist, doesPermissionDelete } = require('../middlewares/cards');
const { cardValidator, cardIdValidator } = require('../middlewares/validation/cards');
const { getAllCards, createCard, deleteCard, addCardLike, deleteCardLike } = require('../controllers/cards');

router.route('/')
  .get(getAllCards)
  .post(cardValidator, createCard);

router.route('/:cardId')
  .delete(cardIdValidator, doesCardExist)
  .delete(doesPermissionDelete)
  .delete(deleteCard);

router.route('/:cardId/likes')
  .all(cardIdValidator, doesCardExist)
  .put(addCardLike)
  .delete(deleteCardLike);

module.exports = router;
