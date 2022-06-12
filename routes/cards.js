const router = require('express').Router();

const { checkRequestParams, doesCardExist } = require('../middlewares/cards');
const { getAllCards, createCard, deleteCard, addCardLike, deleteCardLike } = require('../controllers/cards');

router.route('/')
  .get(getAllCards)
  .post(createCard);

router.route('/:cardId')
  .delete(checkRequestParams)
  .delete(doesCardExist)
  .delete(deleteCard);

router.route('/:cardId/likes')
  .all(checkRequestParams)
  .all(doesCardExist)
  .put(addCardLike)
  .delete(deleteCardLike);

module.exports = router;
