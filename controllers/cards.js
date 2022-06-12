const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({data: cards})
    })
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({name, link, owner: req.user._id})
    .then((card) => {
      res.send({data: card})
    })
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({message: 'Card was deleted'})
    })
}

const addCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    ({ $addToSet: { likes: req.user._id } }),
    { new: true, runValidators: true }
  ).then((likes) => {
      res.send({data: likes})
    })
}

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).then((likes) => {
      res.send({data: likes})
    })
}


module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike
}
