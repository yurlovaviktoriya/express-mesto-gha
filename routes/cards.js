const router = require('../router');

router.get('/cards', getAllCards);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', addCardLike);

router.delete('/cards/:cardId', deleteCard);
router.delete('cards/:cardId/likes', deleteCardLike);
