const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { AuthError } = require('../utils/errors/index');

mongoose.set('toJSON', { useProjection: true });
mongoose.set('toObject', { useProjection: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите имя'],
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: [30, 'Имя не может быть длиннее 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    validate: [validator.isEmail, 'Неправильный формат почты'],
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
