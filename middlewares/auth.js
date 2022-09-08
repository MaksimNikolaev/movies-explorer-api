const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized-err');
const TOKEN_SECRET = require('../utils/constants');
const NOTAUTH_ERROR_MESSAGE = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(NOTAUTH_ERROR_MESSAGE));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    return next(new Unauthorized(NOTAUTH_ERROR_MESSAGE));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
