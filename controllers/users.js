const User = require('../models/user');
const { isDbErrors } = require('../middlewares/app');

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
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

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
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

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateAvatar
};
