const mongoose = require('mongoose');
const { RegExp } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    minlength: [2, 'Наименование не может быть короче двух символов'],
    maxlength: [30, 'Наименование не может быть длиннее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле не может быть пустым'],
    validate: {
      validator: (v) => RegExp.test(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
