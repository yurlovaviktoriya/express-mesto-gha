const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const { isDbErrors, isNotResource } = require('../middlewares/app');
const ConflictError = require('../middlewares/httpErrorClasses/ConflictError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
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
    }).catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    }).catch((err) => {
      isDbErrors(err);
    }).catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => {
      const { name, about, avatar, _id } = data;
      res.send({ name, about, avatar, _id });
    }).catch(next);
};

const createUser = (req, res, next) => {
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
      if (err.code === 11000) {
        res.clearCookie('jwt');
        throw new ConflictError('Пользователь с таким email-адресом уже зарегистрирован');
      }
      isDbErrors(err);
    })
    .catch(next);
};

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      const { name, about, avatar, _id } = data;
      res.send({ name, about, avatar, _id });
    }).catch((err) => {
      isDbErrors(err);
    }).catch(next);
};

const updateUserInfo = (req, res, next) => {
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
      isDbErrors(err);
    }).catch(next);
};

const updateAvatar = (req, res, next) => {
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
      isDbErrors(err);
    }).catch(next);
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
