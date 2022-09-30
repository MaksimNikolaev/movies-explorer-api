const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Unauthorized = require('../errors/Unauthorized-err');
const NotFoundError = require('../errors/Not-found-err');
const BadRequest = require('../errors/Bad-request-err');
const InternalServerError = require('../errors/Internal-server-err');
const ConflictError = require('../errors/Conflict-err');
const {
  TOKEN_SECRET,
  AUTH_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  VALIDATE_EMAIL_ERROR_MESSAGE,
  INCORRECT_DATA_ERROR_MESSAGE,
  USER_NOTFOUND_ERROR_MESSAGE,
  USER_EXIST_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new Unauthorized(AUTH_ERROR_MESSAGE));
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return next(new Unauthorized(AUTH_ERROR_MESSAGE));
    }
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET, { expiresIn: '7d' });
    return res.send({ token });
  } catch (err) {
    return next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hashPassword,
    });
    res.send({
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(VALIDATE_EMAIL_ERROR_MESSAGE));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequest(`${INCORRECT_DATA_ERROR_MESSAGE} ${err}`));
      return;
    }
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError(USER_NOTFOUND_ERROR_MESSAGE));
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true, // обработчик получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он будет создан
      },
    );
    if (!user) {
      next(new NotFoundError(USER_NOTFOUND_ERROR_MESSAGE));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(USER_EXIST_ERROR_MESSAGE));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequest(INCORRECT_DATA_ERROR_MESSAGE));
      return;
    }
    next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
  }
};
