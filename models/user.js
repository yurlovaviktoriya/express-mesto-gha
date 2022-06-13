const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле с именем обязательно для заполнения. Получена пустая строка.'],
    minlength: [2, 'Имя должно содержать минимум 2 знака. Получена строка: {VALUE}'],
    maxlength: [30, 'Имя должно содержать максимум 30 знаков. Получена строка: {VALUE}']
  },
  about: {
    type: String,
    required: [true, 'Поле с описанием рода деятельности обязательно для заполнения. Получена пустая строка.'],
    minlength: [2, 'Описание рода деятельности должно содержать минимум 2 знака. Получена строка: {VALUE}'],
    maxlength: [30, 'Описание рода деятельности должно содержать максимум 30 знаков. Получена строка: {VALUE}']
  },
  avatar: {
    type: String,
    required: [true, 'Поле со ссылкой на аватар обязательно для заполнения. Получена пустая строка.']
  }
});

module.exports = mongoose.model('user', userSchema);
