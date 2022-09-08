const DEFAULT_ERROR_MESSAGE = require('../utils/constants');

const error = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? DEFAULT_ERROR_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = error;
