const { celebrate, Joi } = require('celebrate');

module.exports.cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(
      /^http(s)?:\/\/(www\.)?([\w-]+\.)+(\w)+(\/[\w-._~:/?#\[\]@!$&'()*+,;=]+)?#?$/
    )
  })
});

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24)
  })
});
