const router = require('express').Router();

const { checkRequestParams, doesUserExist, checkUserId } = require('../middlewares/users');
const { isNotResource } = require('../middlewares/app');
const { getAllUsers, getUser, getCurrentUserInfo, updateUserInfo, updateAvatar } = require('../controllers/users');

router.route('/')
  .get(getAllUsers);

router.route('/me')
  .get(getCurrentUserInfo)
  .patch(checkUserId)
  .patch(updateUserInfo);

router.route('/me/avatar')
  .patch(checkUserId)
  .patch(updateAvatar);

router.route('/:id')
  .get(checkRequestParams)
  .get(doesUserExist)
  .get(getUser);

router.all('*', isNotResource);

module.exports = router;
