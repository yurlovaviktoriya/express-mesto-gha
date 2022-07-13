const { celebrate, Joi } = require('celebrate');

module.exports.signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      /^http(s)?:\/\/(www\.)?([\w-]+\.)+(\w)+(\/[\w-._~:/?#\[\]@!$&'()*+,;=]+)?#?$/
    )
  })
});

module.exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

module.exports.userIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24)
  })
});

module.exports.updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
});

module.exports.updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(
      /^http(s)?:\/\/(www\.)?([\w-]+\.)+(\w)+(\/[\w-._~:/?#\[\]@!$&'()*+,;=]+)?#?$/
    )
  })
});
