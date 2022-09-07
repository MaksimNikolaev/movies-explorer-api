const Movie = require('../models/movie');
const NotFoundError = require('../errors/Not-found-err');
const BadRequest = require('../errors/Bad-request-err');
const ForbiddenError = require('../errors/Forbidden-err');
const InternalServerError = require('../errors/Internal-server-err');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});
    res.send(movie);
  } catch (err) {
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.createMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.create({ owner, ...req.body });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`Переданы некорректные данные ${err}`));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.removeMovies = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      next(new NotFoundError('Фильм с указанным _id не найдена.'));
      return;
    }
    if (String(movie.owner) === String(req.user._id)) {
      await movie.remove();
      res.send(movie);
      return;
    }
    next(new ForbiddenError('Нельзя удалить фильм, созданным другим пользователем'));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(`Переданы некорректные данные ${err}`));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};
