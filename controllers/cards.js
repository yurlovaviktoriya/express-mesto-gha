const Card = require('../models/card');
const { isDbErrors } = require('../middlewares/app');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        createdAt: card.createdAt,
        _id: card._id
      });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => {
      res.send(
        { message: 'Card was deleted' }
      );
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const addCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    ({ $addToSet: { likes: req.user._id }}),
    { new: true, runValidators: true }
  )
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        createdAt: card.createdAt,
        _id: card._id
      });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id }},
    { new: true }
  )
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        createdAt: card.createdAt,
        _id: card._id
      });
    }).catch((err) => {
      isDbErrors(res, err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike
};
