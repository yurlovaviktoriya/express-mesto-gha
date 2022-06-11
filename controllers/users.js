const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({data: users})
    })
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({data: user})
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then((user) => {
      res.send({data: user})
    })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser
}
