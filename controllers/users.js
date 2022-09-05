const User = require('../models/user');
const NotFoundError = require('../errors/Not-found-err');
const BadRequest = require('../errors/Bad-request-err');
const InternalServerError = require('../errors/Internal-server-err');

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    res.send(user);
  } catch (err) {
    next(err);
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
      next(new NotFoundError('Пользователь по указанному _id не найден'));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};
