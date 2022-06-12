const router = require('express').Router();

const { doesUserExist } = require('../middlewares/users');
const { getAllUsers, getUser, createUser, updateUserInfo, updateAvatar } = require('../controllers/users');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(doesUserExist)
  .get(getUser);

router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
