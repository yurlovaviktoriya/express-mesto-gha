const router = require('express').Router();

const { checkRequestParams, doesUserExist } = require('../middlewares/users');
const { isNotResource } = require('../middlewares/app');
const { updateUserInfoValidator, updateAvatarValidator } = require('../middlewares/validation/users');
const { getAllUsers, getUser, getCurrentUserInfo, updateUserInfo, updateAvatar } = require('../controllers/users');

router.route('/')
  .get(getAllUsers);

router.route('/me')
  .get(getCurrentUserInfo)
  .patch(updateUserInfoValidator, updateUserInfo);

router.route('/me/avatar')
  .patch(updateAvatarValidator, updateAvatar);

router.route('/:id')
  .get(checkRequestParams)
  .get(doesUserExist)
  .get(getUser);

router.all('*', isNotResource);

module.exports = router;
