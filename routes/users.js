const router = require('express').Router();

const { checkRequestParams, doesUserExist, checkUserId } = require('../middlewares/users');
const { isNotResource } = require('../middlewares/app');
const { getAllUsers, getUser, createUser, updateUserInfo, updateAvatar } = require('../controllers/users');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(checkRequestParams)
  .get(doesUserExist)
  .get(getUser);

router.route('/me')
  .patch(checkUserId)
  .patch(updateUserInfo);

router.route('/me/avatar')
  .patch(checkUserId)
  .patch(updateAvatar);

router.all('*', isNotResource);

module.exports = router;
