const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле с электронной почтой обязательно для заполнения. Получена пустая строка.'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Строка не является email-адресом'
    }
  },
  password: {
    type: String,
    required: [true, 'Поле с паролем обязательно для заполнения. Получена пустая строка.'],
    minlength: [8, 'Пароль должен содержать минимум 8 символов'],
    select: false
  },
  name: {
    type: String,
    minlength: [2, 'Имя должно содержать минимум 2 знака. Получена строка: {VALUE}'],
    maxlength: [30, 'Имя должно содержать максимум 30 знаков. Получена строка: {VALUE}'],
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: [2, 'Описание рода деятельности должно содержать минимум 2 знака. Получена строка: {VALUE}'],
    maxlength: [30, 'Описание рода деятельности должно содержать максимум 30 знаков. Получена строка: {VALUE}'],
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
