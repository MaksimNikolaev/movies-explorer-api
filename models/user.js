const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Неправильный формат почты.'],
  },
  password: {
    type: String,
    required: true,
    select: false, /* хеш пароля пользователя не будет возвращаться из базы */
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
