const router = require('../router');

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);

router.post('/users', createUser);

router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);
