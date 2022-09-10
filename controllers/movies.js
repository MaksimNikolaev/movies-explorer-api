const Movie = require('../models/movie');
const NotFoundError = require('../errors/Not-found-err');
const BadRequest = require('../errors/Bad-request-err');
const ForbiddenError = require('../errors/Forbidden-err');
const InternalServerError = require('../errors/Internal-server-err');
const {
  DEFAULT_ERROR_MESSAGE,
  MOVIE_REMOVE_ERROR_MESSAGE,
  INCORRECT_DATA_ERROR_MESSAGE,
  MOVIE_NOTFOUND_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.find({ owner });
    res.send(movie);
  } catch (err) {
    next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
  }
};

module.exports.createMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.create({ owner, ...req.body });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`${INCORRECT_DATA_ERROR_MESSAGE} ${err}`));
      return;
    }
    next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
  }
};

module.exports.removeMovies = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      next(new NotFoundError(MOVIE_NOTFOUND_ERROR_MESSAGE));
      return;
    }
    if (String(movie.owner) === String(req.user._id)) {
      await movie.remove();
      res.send(movie);
      return;
    }
    next(new ForbiddenError(MOVIE_REMOVE_ERROR_MESSAGE));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(`${INCORRECT_DATA_ERROR_MESSAGE} ${err}`));
      return;
    }
    next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
  }
};
