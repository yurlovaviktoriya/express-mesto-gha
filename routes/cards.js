const router = require('express').Router();

const { getAllCards, createCard, deleteCard, addCardLike, deleteCardLike } = require('../controllers/cards');

router.route('/')
  .get(getAllCards)
  .post(createCard);

router.delete('/:cardId', deleteCard);

router.route('/:cardId/likes')
  .put(addCardLike)
  .delete(deleteCardLike);

module.exports = router;
