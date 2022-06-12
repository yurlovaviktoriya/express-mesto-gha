const router = require('express').Router();

const { checkRequestParams, doesUserExist } = require('../middlewares/users');
const { isNotResource } = require('../middlewares/app');
const { getAllUsers, getUser, createUser, updateUserInfo, updateAvatar } = require('../controllers/users');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(checkRequestParams)
  .get(doesUserExist)
  .get(getUser);

router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

router.all('*', isNotResource);

module.exports = router;
