const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({data: users})
    })
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      const { name, about, avatar, _id } = data;
      res.send({name, about, avatar, _id})
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then((user) => {
      res.send({data: user})
    })
}

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then((user) => {
      res.send({data: user})
    })
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
    .then((user) => {
      res.send({data: user})
    })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateAvatar
}