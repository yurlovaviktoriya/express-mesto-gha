const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле с электронной почтой обязательно для заполнения. Получена пустая строка.'],
    unique: [true, 'Поле с электронной почтой должно быть уникальным. Такая почта уже зарегистрирована']
  },
  password: {
    type: String,
    required: [true, 'Поле с паролем обязательно для заполнения. Получена пустая строка.'],
    minlength: [2, 'Пароль должен содержать минимум 8 символов']
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

module.exports = mongoose.model('user', userSchema);
