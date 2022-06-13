const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле с наименованием места обязательно для заполнения. Получена пустая строка.'],
    minlength: [2, 'Наименование места должно содержать минимум 2 знака. Получена строка: {VALUE}'],
    maxlength: [30, 'Наименование места должно содержать максимум 30 знаков. Получена строка: {VALUE}']
  },
  link: {
    type: String,
    required: [true, 'Поле со ссылкой на изображение обязательно для заполнения. Получена пустая строка.']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Автор записи обязателен для заполнения. Получена пустая строка.']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('card', cardSchema);
