const router = require('express').Router();

const { checkRequestParams, doesCardExist, doesPermissionDelete } = require('../middlewares/cards');
const { isNotResource } = require('../middlewares/app');
const { cardValidator } = require('../middlewares/validation/cards');
const { getAllCards, createCard, deleteCard, addCardLike, deleteCardLike } = require('../controllers/cards');

router.route('/')
  .get(getAllCards)
  .post(cardValidator, createCard);

router.route('/:cardId')
  .delete(checkRequestParams)
  .delete(doesCardExist)
  .delete(doesPermissionDelete)
  .delete(deleteCard);

router.route('/:cardId/likes')
  .all(checkRequestParams)
  .all(doesCardExist)
  .put(addCardLike)
  .delete(deleteCardLike);

router.all('*', isNotResource);

module.exports = router;
