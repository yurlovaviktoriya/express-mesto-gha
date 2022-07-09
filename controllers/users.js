const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const { isDbErrors, isNotResource } = require('../middlewares/app');

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret',
        { expiresIn: '7d' }
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        someSite: true
      }).end();
    }).catch(() => {
      res.status(401).send({ message: 'Ошибка. Неправильные почта или пароль' });
    });
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      const { name, about, avatar, _id } = data;
      res.send({ name, about, avatar, _id });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((data) => {
      res.send({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const getCurrentUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((data) => {
      const { name, about, avatar, _id } = data;
      res.send({ name, about, avatar, _id });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((data) => {
      if (!data) {
        isNotResource(req, res);
      }
      res.send({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        isNotResource(req, res);
      }
      res.send({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

module.exports = {
  login,
  getAllUsers,
  getUser,
  getCurrentUserInfo,
  createUser,
  updateUserInfo,
  updateAvatar
};
