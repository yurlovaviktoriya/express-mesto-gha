const router = require('express').Router();

const { doesUserExist } = require('../middlewares/users');
const { updateUserInfoValidator, updateAvatarValidator, userIdValidator } = require('../middlewares/validation/users');
const { getAllUsers, getUser, getCurrentUserInfo, updateUserInfo, updateAvatar } = require('../controllers/users');

router.route('/')
  .get(getAllUsers);

router.route('/me')
  .get(getCurrentUserInfo)
  .patch(updateUserInfoValidator, updateUserInfo);

router.route('/me/avatar')
  .patch(updateAvatarValidator, updateAvatar);

router.route('/:id')
  .get(userIdValidator, doesUserExist)
  .get(getUser);

module.exports = router;
