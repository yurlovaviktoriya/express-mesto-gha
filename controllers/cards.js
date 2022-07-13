const Card = require('../models/card');
const { isDbErrors } = require('../middlewares/app');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    }).catch((err) => {
      isDbErrors(err);
    }).catch(next);
};

const createCard = (req, res, next) => {
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
      isDbErrors(err);
    }).catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => {
      res.send(
        { message: 'Card was deleted' }
      );
    }).catch((err) => {
      isDbErrors(res, err);
    }).catch(next);
};

const addCardLike = (req, res, next) => {
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
      isDbErrors(err);
    }).catch(next);
};

const deleteCardLike = (req, res, next) => {
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
      isDbErrors(err);
    }).catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike
};
