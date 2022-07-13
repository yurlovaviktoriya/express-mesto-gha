const { celebrate, Joi } = require('celebrate');

const regexLink = require('./regex');

module.exports.cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(new RegExp(regexLink))
  })
});

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24)
  })
});
