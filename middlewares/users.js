const User = require('../models/user');

const doesUserExist = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({message: 'Пользователя не существует'})
        return;
      }
      next();
    })
}

module.exports = {
  doesUserExist
}