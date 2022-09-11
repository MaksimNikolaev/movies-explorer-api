const mongoose = require('mongoose');
const validator = require('validator');
const {
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  INCORRECT_EMAIL_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, MIN_LENGTH_MESSAGE],
    maxlength: [30, MAX_LENGTH_MESSAGE],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, INCORRECT_EMAIL_MESSAGE],
  },
  password: {
    type: String,
    required: true,
    select: false, /* хеш пароля пользователя не будет возвращаться из базы */
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
